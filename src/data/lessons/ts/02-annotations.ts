import type { FillLesson } from '../../curriculum'

const lesson: FillLesson = {
  id: 'ts-basic-02',
  moduleId: 'ts-basic',
  title: '基础类型注解',
  subtitle: 'Type Annotations',
  xp: 10,
  difficulty: 'easy',
  type: 'fill-in-blank',
  questions: [
    {
      instruction: '为变量添加类型注解（字符串类型）',
      template: 'const name: ___ = "TypeScript"',
      blanks: ['string'],
      explanation: '类型注解语法：变量名: 类型。基础类型有 string、number、boolean、null、undefined、any、unknown、never、void。',
    },
    {
      instruction: '为函数参数和返回值添加类型',
      template: 'function add(a: ___, b: number): ___ {\n  return a + b\n}',
      blanks: ['number', 'number'],
      explanation: '函数参数在参数名后加 : 类型，返回值类型在括号后加 : 类型。这里两个参数和返回值都是 number。',
    },
    {
      instruction: 'any 类型的含义',
      template: 'let value: ___ = "hello"\nvalue = 42      // OK\nvalue = true    // OK',
      blanks: ['any'],
      explanation: 'any 类型关闭了类型检查，变量可以持有任何值。应尽量避免使用 any，它会丧失 TypeScript 的保护。',
    },
    {
      instruction: 'void 类型用于无返回值的函数',
      template: 'function log(msg: string): ___ {\n  console.log(msg)\n}',
      blanks: ['void'],
      explanation: 'void 表示函数没有返回值（或返回 undefined）。与 undefined 的区别在于语义：void 表示"无返回值"这一意图。',
    },
    {
      instruction: 'unknown 类型比 any 更安全',
      template: 'function parse(input: ___): string {\n  if (typeof input === "string") return input\n  return String(input)\n}',
      blanks: ['unknown'],
      explanation: 'unknown 是类型安全的 any：你可以接收任何值，但在使用前必须进行类型检查（typeof、instanceof 等）。这是处理外部数据的最佳实践。',
    },
  ],
}

export default lesson
