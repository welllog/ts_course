import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import { useState } from 'react'
import { useProgressStore } from '../../store/useProgressStore'
import { getModuleById } from '../../data/curriculum'
import type { Lesson } from '../../data/curriculum'
import MultipleChoice from './MultipleChoice'
import FillInBlank from './FillInBlank'
import CodeChallenge from './CodeChallenge'
import FeedbackBanner from './FeedbackBanner'

interface Props {
  lesson: Lesson
  moduleId: string
  lessonIndex: number
  totalLessons: number
  nextLessonId?: string
}

function starCount(hearts: number) {
  if (hearts === 3) return 3
  if (hearts === 2) return 2
  return 1
}

export default function LessonShell({ lesson, moduleId, lessonIndex, totalLessons, nextLessonId }: Props) {
  const navigate = useNavigate()
  const { completeLesson, isLessonComplete } = useProgressStore()
  const [completed, setCompleted] = useState(isLessonComplete(lesson.id))
  const [stars, setStars] = useState(0)
  const [showBanner, setShowBanner] = useState(false)
  const mod = getModuleById(moduleId)

  const xpEarned = lesson.xp

  const handleComplete = (hearts: number) => {
    const s = starCount(hearts)
    setStars(s)
    completeLesson(lesson.id, s, xpEarned)
    setCompleted(true)
    setShowBanner(true)
  }

  const handleContinue = () => {
    setShowBanner(false)
    if (nextLessonId) {
      navigate(`/lesson/${moduleId}/${nextLessonId}`)
    } else {
      navigate(`/module/${moduleId}`)
    }
  }

  const progressPct = Math.round(((lessonIndex + 1) / totalLessons) * 100)

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={() => navigate(`/module/${moduleId}`)}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-300"
        >
          ←
        </button>
        <div className="flex-1">
          <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.5 }}
              className={clsx('h-full rounded-full', mod?.color ? `bg-gradient-to-r ${mod.color}` : 'bg-primary-500')}
            />
          </div>
        </div>
        <span className="text-xs text-slate-400">{lessonIndex + 1}/{totalLessons}</span>
      </div>

      <div className="mb-5">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-slate-400">
          <span>{mod?.icon}</span>
          <span>{mod?.title}</span>
        </div>
        <h1 className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">{lesson.title}</h1>
        <div className="mt-2 flex items-center gap-2">
          <span className={clsx(
            'rounded-full px-2.5 py-0.5 text-xs font-medium',
            lesson.difficulty === 'easy' && 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
            lesson.difficulty === 'medium' && 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
            lesson.difficulty === 'hard' && 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
          )}>
            {lesson.difficulty === 'easy' ? '简单' : lesson.difficulty === 'medium' ? '中等' : '困难'}
          </span>
          <span className="text-xs text-slate-400">+{lesson.xp} XP</span>
          {completed && (
            <span className="text-xs text-yellow-500">
              {'⭐'.repeat(stars)}
            </span>
          )}
        </div>
      </div>

      <div className="card">
        {lesson.type === 'multiple-choice' && (
          <MultipleChoice questions={lesson.questions} onComplete={handleComplete} />
        )}
        {lesson.type === 'fill-in-blank' && (
          <FillInBlank questions={lesson.questions} onComplete={handleComplete} />
        )}
        {lesson.type === 'code-challenge' && (
          <CodeChallenge
            instruction={lesson.instruction}
            starterCode={lesson.starterCode}
            tests={lesson.tests}
            onComplete={handleComplete}
          />
        )}
      </div>

      <FeedbackBanner
        show={showBanner}
        correct={true}
        message={`获得 ${xpEarned} XP！${stars === 3 ? ' 完美通关！' : ''}`}
        xp={xpEarned}
        onContinue={handleContinue}
      />
    </div>
  )
}
