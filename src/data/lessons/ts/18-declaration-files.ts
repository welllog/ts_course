import type { MCQLesson } from '../../curriculum'

const lesson: MCQLesson = {
  id: 'ts-adv-08',
  moduleId: 'ts-adv',
  title: '声明文件 .d.ts',
  subtitle: 'Declaration Files',
  xp: 20,
  difficulty: 'medium',
  type: 'multiple-choice',
  questions: [
    {
      text: '声明文件（.d.ts）的作用是什么？',
      options: [
        '为 JavaScript 库提供类型信息，不包含实现代码',
        '存放 TypeScript 的配置',
        '声明全局变量的文件',
        '编译后自动生成的可执行文件',
      ],
      correct: 0,
      explanation: '.d.ts 文件只包含类型声明（type、interface、declare）而无实现代码。使 TypeScript 能理解纯 JS 库（如 lodash、jQuery）的类型。',
    },
    {
      text: '@types/xxx 包是什么？',
      options: [
        'DefinitelyTyped 社区为 JS 库维护的类型声明包',
        '官方 TypeScript 工具包',
        '只有 TypeScript 核心团队才能发布',
        '包含库的源代码和类型',
      ],
      correct: 0,
      explanation: 'DefinitelyTyped 是社区维护的类型声明仓库。安装 @types/react 就能获得 React 的类型声明，无需 React 自己提供 .d.ts 文件。',
    },
    {
      text: 'declare 关键字在 .d.ts 文件中的作用是什么？',
      code: `// 在 .d.ts 文件中
declare function greet(name: string): string
declare const version: string
declare class MyClass {
  constructor(value: number)
}`,
      options: [
        '声明某个值/函数/类存在（在运行时由 JS 提供），告诉 TS 它的类型',
        '定义并实现一个函数',
        '声明这个文件是模块',
        '等同于 export',
      ],
      correct: 0,
      explanation: 'declare 告诉 TypeScript "这个标识符在运行时存在，但实现在别处（通常是 .js 文件）"。.d.ts 文件中所有声明默认是 declare 的。',
    },
    {
      text: '在开源项目中看到 "types": "./dist/index.d.ts" 在 package.json 里，意味着什么？',
      options: [
        '该包自带类型声明，无需额外安装 @types/xxx',
        '该包只能在 TypeScript 项目中使用',
        '该包没有 JavaScript 实现',
        '这是一个错误的配置',
      ],
      correct: 0,
      explanation: 'package.json 的 "types" 字段指向类型声明文件入口。现代库（如 Zod、Vite、Zustand）都自带 .d.ts 文件，直接提供完整类型支持。',
    },
  ],
}

export default lesson
