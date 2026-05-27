import type { MCQLesson } from '../../curriculum'

const lesson: MCQLesson = {
  id: 'js-08',
  moduleId: 'js',
  title: '作用域与闭包',
  subtitle: 'Scope & Closures',
  xp: 20,
  difficulty: 'medium',
  type: 'multiple-choice',
  questions: [
    {
      text: '下面代码输出什么？',
      code: `function outer() {
  let count = 0
  function inner() {
    count++
    console.log(count)
  }
  return inner
}

const counter = outer()
counter() // ?
counter() // ?`,
      options: ['1, 2', '0, 0', '1, 1', 'undefined, undefined'],
      correct: 0,
      explanation: '这是闭包！inner 函数"闭合"了外部函数的 count 变量。每次调用 counter()，inner 都能访问并修改同一个 count，所以输出 1 和 2。',
    },
    {
      text: '变量提升（Hoisting）是指什么？',
      options: [
        'var 声明和 function 声明在代码执行前被移至作用域顶部',
        '变量被移动到文件顶部',
        'let/const 也会被提升',
        '函数调用被提升到声明之前',
      ],
      correct: 0,
      explanation: 'var 声明被提升（值为 undefined），函数声明被完整提升（包括函数体）。let/const 也被提升但处于"暂时性死区"（TDZ），访问会报错。',
    },
    {
      text: '下面经典循环陷阱，输出是什么？',
      code: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0)
}`,
      options: ['3, 3, 3', '0, 1, 2', '0, 0, 0', '报错'],
      correct: 0,
      explanation: '用 var 时，所有回调共享同一个 i，循环结束后 i=3，所以三次都输出 3。若改用 let，每次迭代创建独立的块级作用域，输出 0, 1, 2。',
    },
    {
      text: '立即执行函数表达式（IIFE）的用途是什么？',
      code: '(function() {\n  const private = "secret"\n})()',
      options: [
        '创建独立作用域，避免变量污染全局',
        '让函数运行更快',
        '自动异步执行',
        '这是语法错误',
      ],
      correct: 0,
      explanation: 'IIFE（Immediately Invoked Function Expression）在 ES6 模块化之前常用于隔离作用域。现代代码中 let/const + 块作用域或模块系统可以替代它。',
    },
  ],
}

export default lesson
