import type { FillLesson } from '../../curriculum'

const lesson: FillLesson = {
  id: 'js-03',
  moduleId: 'js',
  title: '函数与箭头函数',
  subtitle: 'Functions',
  xp: 15,
  difficulty: 'easy',
  type: 'fill-in-blank',
  questions: [
    {
      instruction: '声明一个普通函数',
      template: '___ greet(name) {\n  return `Hello, ${name}!`\n}',
      blanks: ['function'],
      explanation: 'function 关键字用于声明函数。函数声明会被提升（hoisting），可以在声明前调用。',
    },
    {
      instruction: '将函数改写为箭头函数',
      template: 'const add = (a, b) ___ {\n  return a + b\n}',
      blanks: ['=>'],
      explanation: '箭头函数使用 => 语法。(params) => { body } 是完整形式；如果只有一个表达式可以省略 {} 和 return：(a, b) => a + b',
    },
    {
      instruction: '单参数箭头函数可以省略括号',
      template: 'const double = ___ => n * 2',
      blanks: ['n'],
      explanation: '当箭头函数只有一个参数时，可以省略参数的括号。多个参数或无参数时必须保留括号 () 或 (a, b)。',
    },
    {
      instruction: '给函数参数设置默认值',
      template: 'function greet(name ___ "World") {\n  return `Hello, ${name}!`\n}',
      blanks: ['='],
      explanation: '默认参数用 = 号设置：function fn(param = defaultValue)。调用时不传该参数（或传 undefined）时使用默认值。',
    },
    {
      instruction: '使用剩余参数收集多个参数',
      template: 'function sum(___numbers) {\n  return numbers.reduce((a, b) => a + b, 0)\n}',
      blanks: ['...'],
      explanation: '... 是展开/剩余运算符。作为函数最后一个参数时，收集所有剩余参数为数组。',
    },
  ],
}

export default lesson
