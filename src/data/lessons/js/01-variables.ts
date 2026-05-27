import type { MCQLesson } from '../../curriculum'

const lesson: MCQLesson = {
  id: 'js-01',
  moduleId: 'js',
  title: '变量与数据类型',
  subtitle: 'var / let / const',
  xp: 10,
  difficulty: 'easy',
  type: 'multiple-choice',
  questions: [
    {
      text: '下面哪个关键字声明的变量不能被重新赋值？',
      options: ['var', 'let', 'const', '三者都可以'],
      correct: 2,
      explanation: 'const 声明的变量绑定不可被重新赋值。注意：如果 const 指向一个对象，对象的属性仍然可以修改。',
    },
    {
      text: '下面代码输出什么？',
      code: `console.log(typeof 42)
console.log(typeof "hello")
console.log(typeof true)`,
      options: ['"number", "string", "boolean"', '"Number", "String", "Boolean"', '"int", "str", "bool"', 'undefined, undefined, undefined'],
      correct: 0,
      explanation: 'typeof 运算符返回小写字符串：number、string、boolean、object、undefined、function、symbol、bigint。',
    },
    {
      text: 'var 与 let 最主要的区别是什么？',
      options: [
        'var 的作用域是函数级，let 的作用域是块级（{}）',
        'var 更快，let 更慢',
        'let 不能在循环中使用',
        '两者完全相同',
      ],
      correct: 0,
      explanation: 'var 是函数作用域（或全局），let/const 是块作用域。这意味着 let 在 if/for/while 的 {} 内声明的变量不会"泄漏"到外部。',
    },
    {
      text: '以下哪个值在 JavaScript 中是 falsy（假值）？',
      options: ['0', '"false"', '[]', '{}'],
      correct: 0,
      explanation: 'falsy 值有：0、""（空字符串）、null、undefined、NaN、false。注意："false"（非空字符串）、[]（空数组）、{}（空对象）都是 truthy。',
    },
    {
      text: "下面代码中 x 的值是什么？\n\nlet x = null ?? 'default'",
      options: ["'default'", 'null', 'undefined', 'false'],
      correct: 0,
      explanation: '?? 是空值合并运算符：只有左侧是 null 或 undefined 时才返回右侧。这里 null ?? "default" 返回 "default"。',
    },
  ],
}

export default lesson
