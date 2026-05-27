import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'

interface Props {
  show: boolean
  correct: boolean
  message: string
  xp?: number
  onContinue: () => void
}

export default function FeedbackBanner({ show, correct, message, xp, onContinue }: Props) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={clsx(
            'fixed inset-x-0 bottom-0 z-50 border-t-4 p-6 shadow-2xl',
            correct
              ? 'border-green-400 bg-green-50 dark:border-green-500 dark:bg-slate-900'
              : 'border-red-400 bg-red-50 dark:border-red-500 dark:bg-slate-900'
          )}
        >
          <div className="mx-auto flex max-w-2xl items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-4xl">{correct ? '🎉' : '💪'}</span>
              <div>
                <p className={clsx(
                  'text-lg font-bold',
                  correct ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'
                )}>
                  {correct ? '太棒了！' : '再接再厉！'}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{message}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              {xp && correct && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-full bg-yellow-400 px-3 py-1 text-sm font-bold text-yellow-900"
                >
                  +{xp} XP
                </motion.span>
              )}
              <button
                onClick={onContinue}
                className={clsx(
                  'rounded-xl px-6 py-2.5 font-semibold text-white transition-all active:scale-95',
                  correct ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
                )}
              >
                继续
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
