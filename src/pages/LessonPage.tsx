import { useParams } from 'react-router-dom'
import { getModuleById } from '../data/curriculum'
import { getLesson } from '../data/lessonLoader'
import LessonShell from '../components/lesson/LessonShell'

export default function LessonPage() {
  const { moduleId, lessonId } = useParams<{ moduleId: string; lessonId: string }>()

  const mod = getModuleById(moduleId ?? '')
  const lesson = getLesson(lessonId ?? '')

  if (!mod || !lesson) {
    return (
      <div className="flex items-center justify-center py-20 text-slate-500">
        课程不存在
      </div>
    )
  }

  const lessonIndex = mod.lessons.findIndex((l) => l.id === lessonId)
  const nextLesson = mod.lessons[lessonIndex + 1]

  return (
    <LessonShell
      lesson={lesson}
      moduleId={mod.id}
      lessonIndex={lessonIndex}
      totalLessons={mod.lessons.length}
      nextLessonId={nextLesson?.id}
    />
  )
}
