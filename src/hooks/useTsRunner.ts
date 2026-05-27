import type { CodeTest } from '../data/curriculum'

interface RunResult {
  testResults: Array<{ description: string; passed: boolean; error?: string }>
  logs: string[]
  error?: string
}

async function transpileTs(code: string): Promise<{ js: string; error?: string }> {
  try {
    const ts = await import('typescript')
    const result = ts.transpileModule(code, {
      compilerOptions: {
        target: ts.ScriptTarget.ES2020,
        module: ts.ModuleKind.None,
        strict: false,
        noEmit: false,
      },
    })
    return { js: result.outputText }
  } catch (e) {
    return { js: '', error: String(e) }
  }
}

export function useTsRunner() {
  const runTests = async (code: string, tests: CodeTest[]): Promise<RunResult> => {
    const logs: string[] = []

    const { js, error } = await transpileTs(code)
    if (error) return { testResults: [], logs, error }

    const testResults: RunResult['testResults'] = []

    for (const test of tests) {
      try {
        const { js: testJs } = await transpileTs(test.expression)

        const captureConsole = (...args: unknown[]) => {
          logs.push(args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' '))
        }

        const fn = new Function(
          'console',
          `"use strict";
${js}

return (async () => { return (${testJs.replace(/;\s*$/, '')}) })();`
        )

        const result = await fn({ log: captureConsole, error: captureConsole, warn: captureConsole })
        testResults.push({ description: test.description, passed: !!result })
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
