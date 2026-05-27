import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import type { MCQQuestion } from '../../data/curriculum'

interface Props {
  questions: MCQQuestion[]
  onComplete: (hearts: number) => void
}

export default function MultipleChoice({ questions, onComplete }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [hearts, setHearts] = useState(3)
  const [wrongCount, setWrongCount] = useState(0)

  const question = questions[currentIndex]
  const isCorrect = selected === question.correct
  const isLast = currentIndex === questions.length - 1

  const handleSelect = (idx: number) => {
    if (revealed) return
    setSelected(idx)
    setRevealed(true)
    if (idx !== question.correct) {
      setHearts((h) => Math.max(0, h - 1))
      setWrongCount((c) => c + 1)
    }
  }

  const handleNext = () => {
    if (isLast) {
      onComplete(hearts)
      return
    }
    setCurrentIndex((i) => i + 1)
    setSelected(null)
    setRevealed(false)
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
          className="flex flex-col gap-5"
        >
          <p className="whitespace-pre-line text-lg font-medium leading-relaxed text-slate-800 dark:text-slate-200">
            {question.text}
          </p>

          {question.code && (
            <pre className="code-block overflow-x-auto text-sm">
              <code>{question.code}</code>
            </pre>
          )}

          <div className="flex flex-col gap-3">
            {question.options.map((option, idx) => (
              <motion.button
                key={idx}
                whileTap={!revealed ? { scale: 0.98 } : undefined}
                onClick={() => handleSelect(idx)}
                className={clsx(
                  'relative w-full rounded-xl border-2 p-4 text-left text-base font-medium transition-all',
                  !revealed && 'cursor-pointer hover:border-primary-400 hover:bg-primary-50 dark:hover:border-primary-500 dark:hover:bg-primary-950/30',
                  revealed && idx === question.correct && 'border-green-400 bg-green-50 text-green-800 dark:border-green-500 dark:bg-green-900/30 dark:text-green-300',
                  revealed && idx === selected && idx !== question.correct && 'border-red-400 bg-red-50 text-red-800 dark:border-red-500 dark:bg-red-900/30 dark:text-red-300',
                  !revealed && 'border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200',
                  revealed && idx !== selected && idx !== question.correct && 'border-slate-200 bg-white opacity-60 dark:border-slate-700 dark:bg-slate-800'
                )}
              >
                <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-slate-500 dark:bg-slate-700 dark:text-slate-400">
                  {String.fromCharCode(65 + idx)}
                </span>
                {option}
                {revealed && idx === question.correct && (
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500">✓</span>
                )}
                {revealed && idx === selected && idx !== question.correct && (
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500">✗</span>
                )}
              </motion.button>
            ))}
          </div>

          <AnimatePresence>
            {revealed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={clsx(
                  'rounded-xl border p-4 text-sm leading-relaxed',
                  isCorrect
                    ? 'border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-900/20 dark:text-green-300'
                    : 'border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-300'
                )}
              >
                <span className="font-semibold">{isCorrect ? '✅ 正确！' : '💡 解析：'}</span>{' '}
                {question.explanation}
              </motion.div>
            )}
          </AnimatePresence>

          {revealed && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleNext}
              className="btn-primary self-end"
            >
              {isLast ? '完成' : '下一题'} →
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>

      {wrongCount > 0 && revealed && (
        <p className="text-center text-xs text-slate-400">答错 {wrongCount} 题，继续加油！</p>
      )}
    </div>
  )
}
