import type { CodeTest } from '../data/curriculum'

interface RunResult {
  testResults: Array<{ description: string; passed: boolean; error?: string }>
  logs: string[]
  error?: string
}

let sucrasePromise: Promise<typeof import('sucrase')> | null = null

async function getSucrase() {
  if (!sucrasePromise) {
    sucrasePromise = import('sucrase')
  }

  return sucrasePromise
}

async function transpileTs(code: string): Promise<{ js: string; error?: string }> {
  if (typeof code !== 'string') {
    return { js: '', error: '编译错误: 代码格式无效' }
  }

  try {
    const { transform } = await getSucrase()
    const result = transform(code, {
      transforms: ['typescript'],
      disableESTransforms: true,
      filePath: 'challenge.ts',
    })

    return { js: result.code.replace(/^(["'])use strict\1;\s*/u, '') }
  } catch (e) {
    return { js: '', error: `编译错误: ${String(e)}` }
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
        const { js: testJs, error: testError } = await transpileTs(test.expression)
        if (testError) {
          testResults.push({
            description: test.description,
            passed: false,
            error: testError,
          })
          continue
        }

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
