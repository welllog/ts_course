import type { MCQLesson } from '../../curriculum'

const lesson: MCQLesson = {
  id: 'ts-basic-01',
  moduleId: 'ts-basic',
  title: '为什么用 TypeScript',
  subtitle: 'Why TypeScript?',
  xp: 10,
  difficulty: 'easy',
  type: 'multiple-choice',
  questions: [
    {
      text: 'TypeScript 是什么？',
      options: [
        'JavaScript 的超集，添加了静态类型系统',
        '全新的编程语言，与 JavaScript 不兼容',
        'JavaScript 的子集，功能更少',
        '一个 JavaScript 运行时',
      ],
      correct: 0,
      explanation: 'TypeScript 是 JavaScript 的超集，任何合法的 JS 代码都是合法的 TS 代码。TS 添加了可选的静态类型，编译后输出纯 JavaScript。',
    },
    {
      text: 'TypeScript 的主要优势是什么？',
      options: [
        '在编译阶段捕获类型错误，提供更好的 IDE 支持',
        '运行速度比 JavaScript 更快',
        '可以直接在浏览器中运行而不需要编译',
        '只能用于大型项目',
      ],
      correct: 0,
      explanation: 'TS 在编译时（而非运行时）发现错误，大幅提升代码质量。IDE 可以提供精准的自动补全、跳转定义、重构等功能。',
    },
    {
      text: '下面 JavaScript 代码有什么潜在问题？',
      code: `function greet(user) {
  return "Hello, " + user.name.toUpperCase()
}

greet(null) // 运行时崩溃！`,
      options: [
        '传入 null 时 user.name 会抛出 TypeError',
        '字符串拼接会自动跳过 null',
        'JavaScript 会自动处理这种情况',
        '代码完全正确',
      ],
      correct: 0,
      explanation: 'JavaScript 在运行时才发现问题：null.name 抛出 "Cannot read properties of null"。TypeScript 可以在编译时就标记出 user 可能为 null 的问题。',
    },
    {
      text: 'TypeScript 代码最终如何运行？',
      options: [
        '通过 tsc 编译为 JavaScript 后，在浏览器/Node.js 中运行',
        'TypeScript 有自己的运行时',
        '直接被浏览器解析',
        '需要安装特殊插件',
      ],
      correct: 0,
      explanation: 'TypeScript 编译器（tsc）将 .ts 文件转换为 .js 文件，类型信息在编译后被完全擦除。最终运行的还是 JavaScript。',
    },
  ],
}

export default lesson
