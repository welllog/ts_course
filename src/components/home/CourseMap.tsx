import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import { modules, isModuleUnlocked, getModuleProgress } from '../../data/curriculum'
import { useProgressStore } from '../../store/useProgressStore'

function LessonDot({ done, current }: { done: boolean; current: boolean }) {
  return (
    <div className={clsx(
      'h-2.5 w-2.5 rounded-full transition-colors',
      done ? 'bg-white/80' : current ? 'bg-white/40 ring-1 ring-white/60' : 'bg-white/20'
    )} />
  )
}

export default function CourseMap() {
  const { completedLessons } = useProgressStore()

  return (
    <div className="flex flex-col gap-6">
      {modules.map((mod, modIdx) => {
        const unlocked = isModuleUnlocked(mod.id, completedLessons)
        const progress = getModuleProgress(mod.id, completedLessons)
        const doneLessons = mod.lessons.filter((l) => completedLessons[l.id]).length
        const nextLesson = mod.lessons.find((l) => !completedLessons[l.id])

        return (
          <motion.div
            key={mod.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: modIdx * 0.1 }}
            className={clsx(
              'relative overflow-hidden rounded-2xl bg-gradient-to-br p-6 shadow-md',
              mod.color,
              !unlocked && 'opacity-60 grayscale'
            )}
          >
            {!unlocked && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                <div className="text-center text-white">
                  <div className="text-4xl">🔒</div>
                  <p className="mt-1 text-sm font-medium">
                    完成上一模块后解锁
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{mod.icon}</span>
                  <div>
                    <h2 className="text-xl font-bold text-white">{mod.title}</h2>
                    <p className="text-sm text-white/70">{mod.subtitle}</p>
                  </div>
                </div>
                <p className="mt-3 max-w-sm text-sm text-white/80">{mod.description}</p>
              </div>

              <div className="text-right text-white">
                <div className="text-2xl font-bold">{doneLessons}/{mod.lessons.length}</div>
                <div className="text-xs text-white/70">课程</div>
              </div>
            </div>

            <div className="mt-5">
              <div className="mb-2 flex items-center gap-2">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/20">
                  <div
                    className="h-full rounded-full bg-white/80 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-white/80">{progress}%</span>
              </div>

              <div className="mb-4 flex flex-wrap gap-1">
                {mod.lessons.map((l) => (
                  <LessonDot
                    key={l.id}
                    done={!!completedLessons[l.id]}
                    current={l.id === nextLesson?.id}
                  />
                ))}
              </div>

              {unlocked && (
                <div className="flex gap-3">
                  {nextLesson && (
                    <Link
                      to={`/lesson/${mod.id}/${nextLesson.id}`}
                      className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 shadow transition-all hover:bg-white/90 active:scale-95"
                    >
                      {doneLessons === 0 ? '开始学习 →' : '继续学习 →'}
                    </Link>
                  )}
                  <Link
                    to={`/module/${mod.id}`}
                    className="rounded-xl bg-white/20 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-white/30 active:scale-95"
                  >
                    查看全部
                  </Link>
                </div>
              )}

              {unlocked && doneLessons === mod.lessons.length && (
                <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-white">
                  <span>🏆</span> 模块完成！
                </div>
              )}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
