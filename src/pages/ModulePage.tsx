import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import { getModuleById, isModuleUnlocked } from '../data/curriculum'
import { useProgressStore } from '../store/useProgressStore'

export default function ModulePage() {
  const { moduleId } = useParams<{ moduleId: string }>()
  const navigate = useNavigate()
  const { completedLessons, getLessonStars } = useProgressStore()

  const mod = getModuleById(moduleId ?? '')
  if (!mod) {
    return <div className="text-center text-slate-500">模块不存在</div>
  }

  const unlocked = isModuleUnlocked(mod.id, completedLessons)

  const typeLabel = (type: string) => {
    if (type === 'multiple-choice') return '选择题'
    if (type === 'fill-in-blank') return '填空题'
    return '代码挑战'
  }

  const typeIcon = (type: string) => {
    if (type === 'multiple-choice') return '🔘'
    if (type === 'fill-in-blank') return '✏️'
    return '💻'
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => navigate('/')}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-300"
        >
          ←
        </button>
        <div className={clsx('h-12 w-12 rounded-2xl bg-gradient-to-br flex items-center justify-center text-2xl shadow-md', mod.color)}>
          {mod.icon}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{mod.title}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">{mod.description}</p>
        </div>
      </div>

      {!unlocked && (
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-800 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-400">
          🔒 完成前置模块后解锁此课程
        </div>
      )}

      <div className="flex flex-col gap-3">
        {mod.lessons.map((lesson, idx) => {
          const done = !!completedLessons[lesson.id]
          const stars = getLessonStars(lesson.id)
          const canPlay = unlocked

          return (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.04 }}
            >
              <Link
                to={canPlay ? `/lesson/${mod.id}/${lesson.id}` : '#'}
                className={clsx(
                  'flex items-center gap-4 rounded-2xl border-2 p-4 transition-all',
                  canPlay
                    ? 'cursor-pointer border-slate-200 bg-white hover:border-primary-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:border-primary-700'
                    : 'cursor-not-allowed border-slate-200 bg-slate-50 opacity-50 dark:border-slate-800 dark:bg-slate-900'
                )}
              >
                <div className={clsx(
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg font-bold',
                  done ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
                )}>
                  {done ? '✓' : idx + 1}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{lesson.title}</p>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span>{typeIcon(lesson.type)} {typeLabel(lesson.type)}</span>
                    <span>·</span>
                    <span>+{lesson.xp} XP</span>
                    <span>·</span>
                    <span className={clsx(
                      lesson.difficulty === 'easy' && 'text-green-600 dark:text-green-400',
                      lesson.difficulty === 'medium' && 'text-yellow-600 dark:text-yellow-400',
                      lesson.difficulty === 'hard' && 'text-red-600 dark:text-red-400',
                    )}>
                      {lesson.difficulty === 'easy' ? '简单' : lesson.difficulty === 'medium' ? '中等' : '困难'}
                    </span>
                  </div>
                </div>

                {done && (
                  <div className="text-yellow-500">
                    {'⭐'.repeat(stars)}{'☆'.repeat(3 - stars)}
                  </div>
                )}
              </Link>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
