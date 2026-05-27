import type { CodeTest } from '../data/curriculum'

interface RunResult {
  testResults: Array<{ description: string; passed: boolean; error?: string }>
  logs: string[]
  error?: string
}

/**
 * Strip TypeScript type annotations using a bracket-aware state machine.
 * Handles: parameter types, return types, and class field type annotations.
 */
function stripTypes(code: string): string {
  // ---------- Helpers ----------
  function skipString(s: string, start: number): number {
    const quote = s[start]
    let i = start + 1
    while (i < s.length) {
      if (s[i] === '\\') { i += 2; continue }
      if (quote === '`' && s[i] === '$' && s[i + 1] === '{') {
        i = skipBrackets(s, i + 2, '{', '}')
        continue
      }
      if (s[i] === quote) return i + 1
      i++
    }
    return i
  }

  function skipBrackets(s: string, start: number, open: string, close: string): number {
    let i = start
    let depth = 1
    while (i < s.length && depth > 0) {
      const ch = s[i]
      if (ch === "'" || ch === '"' || ch === '`') { i = skipString(s, i); continue }
      if (ch === open) depth++
      else if (ch === close) depth--
      i++
    }
    return i
  }

  // ---------- Context ----------
  // '(' = function params, '{' = block/object, '{c' = class body, '<' = generics
  type Bracket = '(' | '{' | '{c' | '<'
  const ctxStack: Bracket[] = []

  function topCtx(): Bracket | undefined {
    return ctxStack.length > 0 ? ctxStack[ctxStack.length - 1] : undefined
  }

  function insideParams(): boolean {
    return topCtx() === '('
  }

  function inClassBody(): boolean {
    // Check if the nearest enclosing '{' is a class body
    for (let j = ctxStack.length - 1; j >= 0; j--) {
      if (ctxStack[j] === '{c') return true
      if (ctxStack[j] === '(' || ctxStack[j] === '<') continue
      if (ctxStack[j] === '{') return false // regular block inside class (e.g. method body)
    }
    return false
  }

  // Flag: set when we see `class` keyword, persists until we consume the opening `{`
  let expectingClassBrace = false

  const out: string[] = []
  let i = 0

  while (i < code.length) {
    const ch = code[i]

    // ---------- Strings ----------
    if (ch === "'" || ch === '"' || ch === '`') {
      const end = skipString(code, i)
      out.push(code.slice(i, end))
      i = end
      continue
    }

    // ---------- Comments ----------
    if (ch === '/' && code[i + 1] === '/') {
      const end = code.indexOf('\n', i)
      out.push(end === -1 ? code.slice(i) : code.slice(i, end))
      i = end === -1 ? code.length : end
      continue
    }
    if (ch === '/' && code[i + 1] === '*') {
      const end = code.indexOf('*/', i + 2)
      if (end === -1) { out.push(code.slice(i)); break }
      out.push(code.slice(i, end + 2))
      i = end + 2
      continue
    }

    // ---------- Type annotation `: Type` ----------
    if (ch === ':') {
      const before = out.join('').trimEnd()
      const lastChar = before[before.length - 1] || ''

      // Ternary `?:` — keep
      if (lastChar === '?') { out.push(ch); i++; continue }

      // Return type `): Type` — always strip
      const isAfterParen = lastChar === ')'

      // Parameter type `(param: Type` — strip only inside (...)
      const isAfterIdent = /[a-zA-Z0-9_$]/.test(lastChar)
      const isParamType = isAfterIdent && insideParams()

      // Class field type `field: Type` — strip only at class body member level
      const isClassField = isAfterIdent && inClassBody()

      if (!isAfterParen && !isParamType && !isClassField) {
        out.push(ch); i++; continue
      }

      // Consume `:` and whitespace
      i++
      while (i < code.length && code[i] === ' ') i++

      // Consume the type expression
      let depth = 0
      let seenContent = false
      let typeEnd = i

      while (i < code.length) {
        const c = code[i]

        if (c === "'" || c === '"' || c === '`') {
          i = skipString(code, i); seenContent = true; typeEnd = i; continue
        }

        // Terminators at depth 0
        if (depth === 0) {
          if (c === ',' || c === '=' || c === ';') break
          if (c === ')') break
          if (c === '\n' && seenContent) break
          if (c === '=' && code[i + 1] === '>') break
          if (c === '{' && seenContent) break
        }

        // Bracket depth
        if (c === '<' || c === '(' || c === '{') depth++
        else if (c === '>' || c === ')' || c === '}') depth--

        if (depth < 0) { i++; break }

        seenContent = true
        i++
        if (c !== ' ' && c !== '\t' && c !== '\n') typeEnd = i
      }
      i = typeEnd
      continue
    }

    // ---------- Track brackets ----------
    if (ch === '(') {
      ctxStack.push('(')
    } else if (ch === ')') {
      if (topCtx() === '(') ctxStack.pop()
    } else if (ch === '{') {
      // Check if this brace opens a class body
      const ctx = expectingClassBrace ? '{c' : '{'
      expectingClassBrace = false
      ctxStack.push(ctx)
    } else if (ch === '}') {
      const t = topCtx()
      if (t === '{' || t === '{c') ctxStack.pop()
    } else if (ch === '<') {
      ctxStack.push('<')
    } else if (ch === '>') {
      if (topCtx() === '<') ctxStack.pop()
    }

    // ---------- Detect `class` keyword for class body tracking ----------
    // Must run BEFORE out.push(ch) so non-word chars don't block the backwards scan
    if (/[a-zA-Z0-9_$]/.test(ch)) {
      // word char — will be pushed below, detection only runs on non-word boundary
    } else {
      // Build the last word from the output buffer (before current non-word char)
      let word = ''
      for (let j = out.length - 1; j >= 0; j--) {
        if (/[a-zA-Z0-9_$]/.test(out[j])) {
          word = out[j] + word
        } else {
          break
        }
      }
      if (word === 'class') {
        expectingClassBrace = true
      } else if (word === 'extends' || word === 'implements') {
        // Keep the flag alive through extends/implements clauses
      } else if (ch === ';' || ch === '\n') {
        // Reset if we hit statement end without seeing `{`
        expectingClassBrace = false
      }
    }

    out.push(ch)

    i++
  }

  return out.join('')
}

function transpileTs(code: string): { js: string; error?: string } {
  try {
    const js = stripTypes(code)
    return { js }
  } catch (e) {
    return { js: '', error: `编译错误: ${String(e)}` }
  }
}

export function useTsRunner() {
  const runTests = async (code: string, tests: CodeTest[]): Promise<RunResult> => {
    const logs: string[] = []

    const { js, error } = transpileTs(code)
    if (error) return { testResults: [], logs, error }

    const testResults: RunResult['testResults'] = []

    for (const test of tests) {
      try {
        const { js: testJs } = transpileTs(test.expression)

        const captureConsole = (...args: unknown[]) => {
          logs.push(
            args
              .map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a)))
              .join(' ')
          )
        }

        const fn = new Function(
          'console',
          `"use strict";
${js}

return (async () => { return (${testJs.replace(/;\s*$/, '')}) })();`
        )

        const result = await fn({
          log: captureConsole,
          error: captureConsole,
          warn: captureConsole,
        })

        testResults.push({
          description: test.description,
          passed: !!result,
        })
      } catch (e) {
        testResults.push({
          description: test.description,
          passed: false,
          error: String(e).split('\n')[0],
        })
      }
    }

    return { testResults, logs }
  }

  return { runTests }
}
