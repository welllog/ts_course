import type { MCQLesson } from '../../curriculum'

const lesson: MCQLesson = {
  id: 'js-04',
  moduleId: 'js',
  title: '数组与常用方法',
  subtitle: 'Arrays',
  xp: 15,
  difficulty: 'easy',
  type: 'multiple-choice',
  questions: [
    {
      text: 'Array.map() 方法的作用是什么？',
      code: 'const nums = [1, 2, 3]\nconst doubled = nums.map(n => n * 2)',
      options: [
        '对每个元素应用函数，返回新数组',
        '过滤掉不满足条件的元素',
        '将数组折叠为单个值',
        '修改原数组并返回它',
      ],
      correct: 0,
      explanation: 'map() 对每个元素执行回调，返回由结果组成的新数组，原数组不变。doubled 的值是 [2, 4, 6]。',
    },
    {
      text: '下面代码中 result 的值是什么？',
      code: 'const nums = [1, 2, 3, 4, 5]\nconst result = nums.filter(n => n % 2 === 0)',
      options: ['[2, 4]', '[1, 3, 5]', '[true, false, true, false, true]', '[1, 2, 3, 4, 5]'],
      correct: 0,
      explanation: 'filter() 保留回调返回 true 的元素。n % 2 === 0 即偶数，所以结果是 [2, 4]。',
    },
    {
      text: 'reduce() 的第二个参数是什么？',
      code: 'const sum = [1, 2, 3].reduce((acc, cur) => acc + cur, 0)',
      options: ['初始值（accumulator 的起始值）', '回调函数', '数组索引', '当前元素'],
      correct: 0,
      explanation: 'reduce(callback, initialValue)。第二个参数是累加器的初始值，这里是 0。如果不提供初始值，使用数组第一个元素。sum 的结果是 6。',
    },
    {
      text: '如何向数组末尾添加一个元素？',
      options: ['arr.push(item)', 'arr.append(item)', 'arr.add(item)', 'arr.insert(item)'],
      correct: 0,
      explanation: 'push() 在数组末尾添加元素并返回新长度。对应地，pop() 移除并返回最后一个元素。unshift/shift 对应开头。',
    },
    {
      text: '展开运算符 ... 用于数组时的作用是？',
      code: 'const a = [1, 2]\nconst b = [3, 4]\nconst c = [...a, ...b]',
      options: ['将数组展开为独立元素，合并成新数组', '深拷贝数组', '对数组求和', '反转数组'],
      correct: 0,
      explanation: '... 展开运算符将数组展开为逐个元素。这里 c 是 [1, 2, 3, 4]，这是合并数组的常用方式。',
    },
  ],
}

export default lesson
