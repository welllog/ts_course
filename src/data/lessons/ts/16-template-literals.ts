import type { FillLesson } from '../../curriculum'

const lesson: FillLesson = {
  id: 'ts-adv-06',
  moduleId: 'ts-adv',
  title: '模板字面量类型',
  subtitle: 'Template Literal Types',
  xp: 20,
  difficulty: 'medium',
  type: 'fill-in-blank',
  questions: [
    {
      instruction: '模板字面量类型：在类型层面拼接字符串',
      template: 'type EventName<T extends string> = `on${___}`',
      blanks: ['Capitalize<T>'],
      hint: 'Capitalize<T> 将首字母大写',
      explanation: '模板字面量类型使用反引号，可以引用其他类型。Capitalize<T> 是内置工具类型，将字符串首字母大写。EventName<"click"> 得到 "onClick"。',
    },
    {
      instruction: '联合类型在模板字面量中自动展开',
      template: 'type Direction = "top" | "right" | "bottom" | "left"\ntype Padding = `padding-${___}`',
      blanks: ['Direction'],
      explanation: '当模板字面量中的类型是联合类型时，结果自动展开为所有组合。Padding 类型是 "padding-top" | "padding-right" | "padding-bottom" | "padding-left"。',
    },
    {
      instruction: '内置字符串操作类型',
      template: 'type Upper = ___ <"hello world">  // "HELLO WORLD"',
      blanks: ['Uppercase'],
      explanation: 'TypeScript 内置了四个字符串操作类型：Uppercase<T>（全大写）、Lowercase<T>（全小写）、Capitalize<T>（首字母大写）、Uncapitalize<T>（首字母小写）。',
    },
  ],
}

export default lesson
