import { motion } from 'framer-motion'
import CourseMap from '../components/home/CourseMap'
import AchievementBadge from '../components/home/AchievementBadge'
import { useProgressStore } from '../store/useProgressStore'
import { totalLessons } from '../data/curriculum'

export default function HomePage() {
  const { xp, level, streak, completedLessons } = useProgressStore()
  const done = Object.keys(completedLessons).length

  return (
    <div className="flex flex-col gap-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-500 to-accent-500 p-8 text-white shadow-xl"
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-extrabold leading-tight">
              TypeScript Quest ⚡
            </h1>
            <p className="mt-2 max-w-md text-lg text-white/80">
              从零开始，用游戏的方式掌握 JavaScript 与 TypeScript，读懂任何开源代码。
            </p>
          </div>
          <div className="flex flex-row gap-4 sm:flex-col sm:text-right">
            <div className="rounded-2xl bg-white/20 px-4 py-3 backdrop-blur">
              <div className="text-2xl font-bold">{done}/{totalLessons}</div>
              <div className="text-xs text-white/70">课程完成</div>
            </div>
            {streak > 0 && (
              <div className="rounded-2xl bg-white/20 px-4 py-3 backdrop-blur">
                <div className="text-2xl font-bold">🔥 {streak}</div>
                <div className="text-xs text-white/70">连续天数</div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-3">
        {[
          { icon: '⚡', label: '总 XP', value: xp.toLocaleString() },
          { icon: '🎯', label: '等级', value: `Lv.${level}` },
          { icon: '📚', label: '完成率', value: `${Math.round((done / totalLessons) * 100)}%` },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="card flex items-center gap-4"
          >
            <span className="text-3xl">{stat.icon}</span>
            <div>
              <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">{stat.value}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div>
        <h2 className="mb-4 text-xl font-bold text-slate-800 dark:text-slate-100">学习路线</h2>
        <CourseMap />
      </div>

      <AchievementBadge />
    </div>
  )
}
