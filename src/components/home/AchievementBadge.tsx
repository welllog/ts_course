import { motion } from 'framer-motion'
import { ACHIEVEMENTS } from '../../store/useProgressStore'
import { useProgressStore } from '../../store/useProgressStore'
import clsx from 'clsx'

export default function AchievementBadge() {
  const { achievements } = useProgressStore()
  const all = Object.values(ACHIEVEMENTS)

  return (
    <div className="card">
      <h3 className="mb-4 text-base font-semibold text-slate-700 dark:text-slate-300">成就徽章</h3>
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-7">
        {all.map((ach, i) => {
          const earned = achievements.includes(ach.id)
          return (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              title={`${ach.label}: ${ach.description}`}
              className={clsx(
                'flex flex-col items-center gap-1 rounded-xl p-2 text-center transition-all',
                earned
                  ? 'bg-yellow-50 ring-1 ring-yellow-200 dark:bg-yellow-900/20 dark:ring-yellow-700'
                  : 'bg-slate-100 opacity-40 grayscale dark:bg-slate-800'
              )}
            >
              <span className="text-2xl">{ach.icon}</span>
              <span className="text-xs font-medium leading-tight text-slate-600 dark:text-slate-400">
                {ach.label}
              </span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
