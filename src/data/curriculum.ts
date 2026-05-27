export type LessonType = 'multiple-choice' | 'fill-in-blank' | 'code-challenge'
export type Difficulty = 'easy' | 'medium' | 'hard'

export interface MCQQuestion {
  text: string
  code?: string
  options: string[]
  correct: number
  explanation: string
}

export interface FillQuestion {
  instruction: string
  template: string
  blanks: string[]
  hint?: string
  explanation: string
}

export interface CodeTest {
  description: string
  expression: string
}

export interface LessonMeta {
  id: string
  moduleId: string
  title: string
  subtitle: string
  xp: number
  difficulty: Difficulty
  type: LessonType
}

export interface MCQLesson extends LessonMeta {
  type: 'multiple-choice'
  questions: MCQQuestion[]
}

export interface FillLesson extends LessonMeta {
  type: 'fill-in-blank'
  questions: FillQuestion[]
}

export interface CodeLesson extends LessonMeta {
  type: 'code-challenge'
  instruction: string
  starterCode: string
  tests: CodeTest[]
}

export type Lesson = MCQLesson | FillLesson | CodeLesson

export interface Module {
  id: string
  title: string
  subtitle: string
  description: string
  color: string
  icon: string
  lessons: LessonMeta[]
  requiresModuleId?: string
}

export const modules: Module[] = [
  {
    id: 'js',
    title: 'JavaScript 基础',
    subtitle: 'JavaScript Fundamentals',
    description: '掌握现代 JavaScript 的核心概念，为 TypeScript 打下坚实基础。',
    color: 'from-yellow-400 to-orange-400',
    icon: '🟡',
    lessons: [
      { id: 'js-01', moduleId: 'js', title: '变量与数据类型', subtitle: 'var / let / const', xp: 10, difficulty: 'easy', type: 'multiple-choice' },
      { id: 'js-02', moduleId: 'js', title: '字符串操作', subtitle: 'String Methods', xp: 10, difficulty: 'easy', type: 'fill-in-blank' },
      { id: 'js-03', moduleId: 'js', title: '函数与箭头函数', subtitle: 'Functions', xp: 15, difficulty: 'easy', type: 'fill-in-blank' },
      { id: 'js-04', moduleId: 'js', title: '数组与常用方法', subtitle: 'Arrays', xp: 15, difficulty: 'easy', type: 'multiple-choice' },
      { id: 'js-05', moduleId: 'js', title: '对象与解构', subtitle: 'Objects & Destructuring', xp: 15, difficulty: 'medium', type: 'fill-in-blank' },
      { id: 'js-06', moduleId: 'js', title: '控制流', subtitle: 'if / else / switch', xp: 10, difficulty: 'easy', type: 'multiple-choice' },
      { id: 'js-07', moduleId: 'js', title: '循环', subtitle: 'for / for...of / forEach', xp: 15, difficulty: 'easy', type: 'fill-in-blank' },
      { id: 'js-08', moduleId: 'js', title: '作用域与闭包', subtitle: 'Scope & Closures', xp: 20, difficulty: 'medium', type: 'multiple-choice' },
      { id: 'js-09', moduleId: 'js', title: 'Promise 与 async/await', subtitle: 'Asynchronous JS', xp: 25, difficulty: 'medium', type: 'code-challenge' },
      { id: 'js-10', moduleId: 'js', title: '类与原型', subtitle: 'Classes & Prototypes', xp: 25, difficulty: 'medium', type: 'code-challenge' },
      { id: 'js-11', moduleId: 'js', title: 'ES Modules', subtitle: 'import / export', xp: 15, difficulty: 'medium', type: 'fill-in-blank' },
      { id: 'js-12', moduleId: 'js', title: '综合挑战', subtitle: 'Final Challenge', xp: 30, difficulty: 'hard', type: 'code-challenge' },
    ],
  },
  {
    id: 'ts-basic',
    title: 'TypeScript 入门',
    subtitle: 'TypeScript Basics',
    description: '在 JavaScript 基础上添加类型系统，让代码更安全、更易维护。',
    color: 'from-blue-400 to-primary-500',
    icon: '🔷',
    requiresModuleId: 'js',
    lessons: [
      { id: 'ts-basic-01', moduleId: 'ts-basic', title: '为什么用 TypeScript', subtitle: 'Why TypeScript?', xp: 10, difficulty: 'easy', type: 'multiple-choice' },
      { id: 'ts-basic-02', moduleId: 'ts-basic', title: '基础类型注解', subtitle: 'Type Annotations', xp: 10, difficulty: 'easy', type: 'fill-in-blank' },
      { id: 'ts-basic-03', moduleId: 'ts-basic', title: '数组与元组', subtitle: 'Arrays & Tuples', xp: 15, difficulty: 'easy', type: 'fill-in-blank' },
      { id: 'ts-basic-04', moduleId: 'ts-basic', title: '接口 Interface', subtitle: 'Interfaces', xp: 20, difficulty: 'medium', type: 'code-challenge' },
      { id: 'ts-basic-05', moduleId: 'ts-basic', title: '类型别名与联合类型', subtitle: 'Type Aliases & Union', xp: 15, difficulty: 'medium', type: 'fill-in-blank' },
      { id: 'ts-basic-06', moduleId: 'ts-basic', title: '函数类型', subtitle: 'Function Types', xp: 20, difficulty: 'medium', type: 'code-challenge' },
      { id: 'ts-basic-07', moduleId: 'ts-basic', title: '枚举 Enum', subtitle: 'Enums', xp: 15, difficulty: 'medium', type: 'multiple-choice' },
      { id: 'ts-basic-08', moduleId: 'ts-basic', title: '类型推断', subtitle: 'Type Inference', xp: 15, difficulty: 'easy', type: 'multiple-choice' },
      { id: 'ts-basic-09', moduleId: 'ts-basic', title: '可选与空值处理', subtitle: 'Optional & Nullability', xp: 25, difficulty: 'medium', type: 'code-challenge' },
      { id: 'ts-basic-10', moduleId: 'ts-basic', title: '类型断言', subtitle: 'Type Assertions', xp: 15, difficulty: 'medium', type: 'fill-in-blank' },
    ],
  },
  {
    id: 'ts-adv',
    title: 'TypeScript 进阶',
    subtitle: 'TypeScript Advanced',
    description: '掌握泛型、工具类型和类型系统的高级特性，读懂任何开源代码。',
    color: 'from-purple-400 to-accent-500',
    icon: '🏆',
    requiresModuleId: 'ts-basic',
    lessons: [
      { id: 'ts-adv-01', moduleId: 'ts-adv', title: '泛型基础', subtitle: 'Generics', xp: 25, difficulty: 'medium', type: 'code-challenge' },
      { id: 'ts-adv-02', moduleId: 'ts-adv', title: '泛型约束', subtitle: 'Generic Constraints', xp: 25, difficulty: 'hard', type: 'code-challenge' },
      { id: 'ts-adv-03', moduleId: 'ts-adv', title: '工具类型', subtitle: 'Utility Types', xp: 30, difficulty: 'hard', type: 'code-challenge' },
      { id: 'ts-adv-04', moduleId: 'ts-adv', title: '类型守卫与窄化', subtitle: 'Type Guards', xp: 25, difficulty: 'hard', type: 'code-challenge' },
      { id: 'ts-adv-05', moduleId: 'ts-adv', title: '映射类型', subtitle: 'Mapped Types', xp: 30, difficulty: 'hard', type: 'code-challenge' },
      { id: 'ts-adv-06', moduleId: 'ts-adv', title: '模板字面量类型', subtitle: 'Template Literal Types', xp: 20, difficulty: 'medium', type: 'fill-in-blank' },
      { id: 'ts-adv-07', moduleId: 'ts-adv', title: '条件类型', subtitle: 'Conditional Types', xp: 30, difficulty: 'hard', type: 'code-challenge' },
      { id: 'ts-adv-08', moduleId: 'ts-adv', title: '声明文件 .d.ts', subtitle: 'Declaration Files', xp: 20, difficulty: 'medium', type: 'multiple-choice' },
      { id: 'ts-adv-09', moduleId: 'ts-adv', title: '读懂 React 源码类型', subtitle: 'Reading React Types', xp: 30, difficulty: 'hard', type: 'code-challenge' },
      { id: 'ts-adv-10', moduleId: 'ts-adv', title: '读懂 Node/Express 类型', subtitle: 'Reading Node Types', xp: 30, difficulty: 'hard', type: 'code-challenge' },
    ],
  },
]

export const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0)

export function getModuleById(moduleId: string): Module | undefined {
  return modules.find((m) => m.id === moduleId)
}

export function getLessonMeta(moduleId: string, lessonId: string): LessonMeta | undefined {
  return getModuleById(moduleId)?.lessons.find((l) => l.id === lessonId)
}

export function isModuleUnlocked(moduleId: string, completedLessons: Record<string, unknown>): boolean {
  const mod = getModuleById(moduleId)
  if (!mod?.requiresModuleId) return true
  const required = getModuleById(mod.requiresModuleId)
  if (!required) return true
  return required.lessons.every((l) => !!completedLessons[l.id])
}

export function getModuleProgress(moduleId: string, completedLessons: Record<string, unknown>): number {
  const mod = getModuleById(moduleId)
  if (!mod) return 0
  const done = mod.lessons.filter((l) => !!completedLessons[l.id]).length
  return Math.round((done / mod.lessons.length) * 100)
}
