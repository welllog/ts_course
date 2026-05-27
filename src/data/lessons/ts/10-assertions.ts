import type { FillLesson } from '../../curriculum'

const lesson: FillLesson = {
  id: 'ts-basic-10',
  moduleId: 'ts-basic',
  title: '类型断言',
  subtitle: 'Type Assertions',
  xp: 15,
  difficulty: 'medium',
  type: 'fill-in-blank',
  questions: [
    {
      instruction: '使用 as 进行类型断言',
      template: 'const input = document.getElementById("name") ___ HTMLInputElement\nconst value = input.value',
      blanks: ['as'],
      explanation: '类型断言 as 告诉 TypeScript "我比你更了解这个值的类型"。这里 getElementById 返回 HTMLElement | null，我们断言它是 HTMLInputElement 才能访问 .value。',
    },
    {
      instruction: 'as const 将对象变为只读常量',
      template: 'const config = {\n  host: "localhost",\n  port: 3000\n} ___ const',
      blanks: ['as'],
      explanation: 'as const 将对象的所有属性变为只读字面量类型。config.host 的类型不是 string，而是 "localhost"（字面量类型）。',
    },
    {
      instruction: '双重断言（应谨慎使用）',
      template: 'const value = someValue as ___ as TargetType',
      blanks: ['unknown'],
      explanation: '当两个类型没有重叠时，需要先断言为 unknown（或 any），再断言为目标类型。这会绕过类型检查，应该避免使用。',
    },
    {
      instruction: '非空断言：确保值不为 null/undefined',
      template: 'function process(value: string | null) {\n  const len = value___.length\n}',
      blanks: ['!'],
      explanation: '! 后缀是非空断言运算符：告诉 TS 这个值一定不是 null 或 undefined。如果判断错误，会在运行时报错，所以要谨慎使用。',
    },
  ],
}

export default lesson
