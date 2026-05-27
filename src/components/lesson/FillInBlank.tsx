import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import type { FillQuestion } from '../../data/curriculum'

interface Props {
  questions: FillQuestion[]
  onComplete: (hearts: number) => void
}

function FillQuestion_({ question, onAnswer }: { question: FillQuestion; onAnswer: (correct: boolean) => void }) {
  const [values, setValues] = useState<string[]>(question.blanks.map(() => ''))
  const [checked, setChecked] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  const parts = question.template.split('___')

  const check = () => {
    const allCorrect = question.blanks.every((blank, i) =>
      (values[i] ?? '').trim().toLowerCase() === blank.toLowerCase()
    )
    setChecked(true)
    setCorrect(allCorrect)
    onAnswer(allCorrect)
  }

  const handleKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key === 'Enter') {
      if (i < question.blanks.length - 1) {
        inputRefs.current[i + 1]?.focus()
      } else if (!checked) {
        check()
      }
    }
  }

  let blankIdx = 0

  return (
    <div className="flex flex-col gap-4">
      <p className="text-base font-medium text-slate-700 dark:text-slate-300">{question.instruction}</p>

      <div className="code-block whitespace-pre-wrap font-mono text-sm leading-8">
        {parts.map((part, partIdx) => (
          <span key={partIdx}>
            {part}
            {partIdx < parts.length - 1 && (() => {
              const idx = blankIdx++
              return (
                <input
                  ref={(el) => { inputRefs.current[idx] = el }}
                  value={values[idx] ?? ''}
                  onChange={(e) => {
                    const next = [...values]
                    next[idx] = e.target.value
                    setValues(next)
                  }}
                  onKeyDown={(e) => handleKey(e, idx)}
                  disabled={checked}
                  className={clsx(
                    'mx-1 inline-block rounded border-b-2 bg-transparent px-1 font-mono text-sm outline-none transition-colors',
                    'w-24 text-center',
                    !checked && 'border-primary-400 text-primary-300 focus:border-primary-300',
                    checked && correct && 'border-green-400 text-green-300',
                    checked && !correct && 'border-red-400 text-red-300'
                  )}
                  style={{ minWidth: `${Math.max(8, (question.blanks[idx]?.length ?? 4) * 10)}px` }}
                />
              )
            })()}
          </span>
        ))}
      </div>

      {question.hint && (
        <button
          onClick={() => setShowHint(true)}
          className="self-start text-xs text-primary-500 hover:underline"
        >
          {showHint ? `💡 提示：${question.hint}` : '🔍 显示提示'}
        </button>
      )}

      <AnimatePresence>
        {checked && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={clsx(
              'rounded-xl border p-4 text-sm leading-relaxed',
              correct
                ? 'border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-900/20 dark:text-green-300'
                : 'border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-300'
            )}
          >
            {!correct && (
              <div className="mb-2">
                <span className="font-semibold">正确答案：</span>
                {question.blanks.join(' / ')}
              </div>
            )}
            <span className="font-semibold">{correct ? '✅ 正确！' : '💡 解析：'}</span>{' '}
            {question.explanation}
          </motion.div>
        )}
      </AnimatePresence>

      {!checked && (
        <button
          onClick={check}
          disabled={values.some((v) => !v.trim())}
          className="btn-primary self-end"
        >
          检查答案
        </button>
      )}
    </div>
  )
}

export default function FillInBlank({ questions, onComplete }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hearts, setHearts] = useState(3)
  const [answered, setAnswered] = useState(false)

  const isLast = currentIndex === questions.length - 1

  const handleAnswer = (correct: boolean) => {
    setAnswered(true)
    if (!correct) setHearts((h) => Math.max(0, h - 1))
  }

  const handleNext = () => {
    if (isLast) {
      onComplete(hearts)
      return
    }
    setCurrentIndex((i) => i + 1)
    setAnswered(false)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
        <span>题目 {currentIndex + 1} / {questions.length}</span>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span key={i} className={i < hearts ? 'text-red-500' : 'opacity-30 grayscale'}>❤️</span>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <FillQuestion_ question={questions[currentIndex]!} onAnswer={handleAnswer} />
        </motion.div>
      </AnimatePresence>

      {answered && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleNext}
          className="btn-primary self-end"
        >
          {isLast ? '完成' : '下一题'} →
        </motion.button>
      )}
    </div>
  )
}
