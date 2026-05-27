import type { FillLesson } from '../../curriculum'

const lesson: FillLesson = {
  id: 'js-07',
  moduleId: 'js',
  title: '循环',
  subtitle: 'for / for...of / forEach',
  xp: 15,
  difficulty: 'easy',
  type: 'fill-in-blank',
  questions: [
    {
      instruction: '传统 for 循环：遍历数组索引',
      template: 'const arr = [10, 20, 30]\nfor (___ i = 0; i < arr.length; i++) {\n  console.log(arr[i])\n}',
      blanks: ['let'],
      explanation: '传统 for 循环：for (初始化; 条件; 递增)。用 let 而非 var 声明循环变量，以确保块级作用域。',
    },
    {
      instruction: 'for...of 遍历数组元素值',
      template: 'const fruits = ["apple", "banana"]\nfor (___ fruit ___ fruits) {\n  console.log(fruit)\n}',
      blanks: ['const', 'of'],
      explanation: 'for...of 直接遍历可迭代对象（数组、字符串等）的元素值，无需索引。注意 for...in 遍历的是对象的键名，不适合数组。',
    },
    {
      instruction: '使用 forEach 遍历数组',
      template: '[1, 2, 3].___(num => console.log(num))',
      blanks: ['forEach'],
      explanation: 'forEach 是数组方法，对每个元素执行回调函数。与 for...of 不同，forEach 不支持 break 和 continue。',
    },
    {
      instruction: '用 for...of 同时获取索引和值',
      template: 'const arr = ["a", "b"]\nfor (const [index, value] of arr.___()) {\n  console.log(index, value)\n}',
      blanks: ['entries'],
      explanation: 'arr.entries() 返回 [index, value] 对的迭代器，配合解构可以同时获取索引和值。',
    },
  ],
}

export default lesson
