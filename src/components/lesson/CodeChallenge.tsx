import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import loader from '@monaco-editor/loader'
import type { CodeTest } from '../../data/curriculum'
import { useTsRunner } from '../../hooks/useTsRunner'

interface Props {
  instruction: string
  starterCode: string
  tests: CodeTest[]
  onComplete: (hearts: number) => void
}

interface TestResult {
  description: string
  passed: boolean
  error?: string
}

export default function CodeChallenge({ instruction, starterCode, tests, onComplete }: Props) {
  const [code, setCode] = useState(starterCode)
  const [results, setResults] = useState<TestResult[] | null>(null)
  const [output, setOutput] = useState<string[]>([])
  const [running, setRunning] = useState(false)
  const { runTests } = useTsRunner()
  const editorRef = useRef<unknown>(null)
  const [MonacoEditor, setMonacoEditor] = useState<React.ComponentType<{
    value: string
    language: string
    theme: string
    onChange: (v?: string) => void
    onMount: (editor: unknown) => void
    options: Record<string, unknown>
    height: string
  }> | null>(null)

  useEffect(() => {
    let mounted = true

    loader.config({
      paths: {
        vs: '/monaco/vs',
      },
    })

    import('@monaco-editor/react').then((m) => {
      if (mounted) {
        setMonacoEditor(() => m.default as typeof MonacoEditor)
      }
    })

    return () => {
      mounted = false
    }
  }, [])

  const isDark = document.documentElement.classList.contains('dark')

  const run = async () => {
    setRunning(true)
    setResults(null)
    setOutput([])
    const { testResults, logs, error } = await runTests(code, tests)
    setRunning(false)
    if (error) {
      setOutput([`❌ 编译错误: ${error}`])
      return
    }
    setOutput(logs)
    setResults(testResults)
  }

  const allPassed = results?.every((r) => r.passed) ?? false
  const passedCount = results?.filter((r) => r.passed).length ?? 0

  const hearts = allPassed ? 3 : passedCount > 0 ? 2 : 1

  return (
    <div className="flex flex-col gap-5">
      <div className="prose prose-sm max-w-none dark:prose-invert">
        <div
          className="rounded-xl bg-white p-5 text-sm leading-relaxed text-slate-700 shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(instruction) }}
        />
      </div>

      <div className="overflow-hidden rounded-xl ring-1 ring-slate-200 dark:ring-slate-700">
        <div className="flex items-center justify-between bg-slate-800 px-4 py-2 dark:bg-slate-900">
          <span className="text-xs font-medium text-slate-400">TypeScript</span>
          <button
            onClick={() => setCode(starterCode)}
            className="text-xs text-slate-500 hover:text-slate-300"
          >
            重置
          </button>
        </div>
        {MonacoEditor ? (
          <MonacoEditor
            height="300px"
            language="typescript"
            theme={isDark ? 'vs-dark' : 'vs'}
            value={code}
            onChange={(v) => setCode(v ?? '')}
            onMount={(editor) => { editorRef.current = editor }}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: 'JetBrains Mono, Fira Code, monospace',
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              wordWrap: 'on',
            }}
          />
        ) : (
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="h-72 w-full bg-[#1e1e1e] p-4 font-mono text-sm text-slate-100 outline-none"
            spellCheck={false}
          />
        )}
      </div>

      <div className="flex items-center gap-3">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={run}
          disabled={running}
          className="btn-primary"
        >
          {running ? '⏳ 运行中...' : '▶ 运行测试'}
        </motion.button>
        {results && (
          <span className="text-sm text-slate-500 dark:text-slate-400">
            通过 {passedCount}/{tests.length}
          </span>
        )}
      </div>

      {output.length > 0 && (
        <div className="rounded-xl bg-slate-900 p-4 dark:bg-slate-950">
          <p className="mb-2 text-xs font-medium text-slate-500">输出</p>
          {output.map((line, i) => (
            <div key={i} className="font-mono text-sm text-slate-300">{line}</div>
          ))}
        </div>
      )}

      {results && (
        <div className="flex flex-col gap-2">
          {results.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={clsx(
                'flex items-start gap-3 rounded-xl border p-3 text-sm',
                r.passed
                  ? 'border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-900/20 dark:text-green-300'
                  : 'border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300'
              )}
            >
              <span className="text-base">{r.passed ? '✅' : '❌'}</span>
              <div>
                <div className="font-medium">{r.description}</div>
                {r.error && <div className="mt-1 font-mono text-xs opacity-75">{r.error}</div>}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {allPassed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-3 rounded-2xl bg-gradient-to-r from-green-400 to-primary-500 p-6 text-white"
        >
          <span className="text-4xl">🎉</span>
          <p className="text-xl font-bold">所有测试通过！</p>
          <button
            onClick={() => onComplete(hearts)}
            className="rounded-xl bg-white/20 px-6 py-2.5 font-semibold backdrop-blur hover:bg-white/30"
          >
            完成本课 →
          </button>
        </motion.div>
      )}
    </div>
  )
}

function markdownToHtml(md: string): string {
  return md
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/^## (.+)$/gm, '<h2 class="text-lg font-bold mt-4 mb-2">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="text-base font-semibold mt-3 mb-1">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/```[\w]*\n([\s\S]*?)```/g, '<pre class="code-block my-3 overflow-x-auto text-xs"><code>$1</code></pre>')
    .replace(/`([^`]+)`/g, '<code class="rounded bg-slate-100 dark:bg-slate-700 px-1 py-0.5 text-xs font-mono">$1</code>')
    .replace(/\n\n/g, '</p><p class="mt-2">')
    .replace(/^(?!<)(.+)$/gm, '<p>$1</p>')
    .replace(/\| (.+) \|/g, (_, row) => {
      const cells = row.split(' | ')
      return `<tr>${cells.map((c: string) => `<td class="border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs">${c}</td>`).join('')}</tr>`
    })
    .replace(/(<tr>[\s\S]*?<\/tr>)/g, '<table class="w-full border-collapse my-3 text-sm">$1</table>')
    .replace(/- (.+)/g, '<li class="ml-4 list-disc">$1</li>')
}
