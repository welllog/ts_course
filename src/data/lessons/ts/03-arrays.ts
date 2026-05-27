import type { FillLesson } from '../../curriculum'

const lesson: FillLesson = {
  id: 'ts-basic-03',
  moduleId: 'ts-basic',
  title: '数组与元组',
  subtitle: 'Arrays & Tuples',
  xp: 15,
  difficulty: 'easy',
  type: 'fill-in-blank',
  questions: [
    {
      instruction: '声明字符串数组（两种方式之一）',
      template: 'const names: ___[] = ["Alice", "Bob"]',
      blanks: ['string'],
      explanation: '数组类型注解：元素类型后加 []。等价写法：Array<string>。推荐使用 string[] 这种简洁形式。',
    },
    {
      instruction: '使用泛型语法声明数字数组',
      template: 'const scores: Array<___> = [95, 87, 92]',
      blanks: ['number'],
      explanation: 'Array<T> 是泛型数组类型，T 是元素类型。两种写法完全等价：number[] 和 Array<number>。',
    },
    {
      instruction: '声明元组：固定长度和类型的数组',
      template: 'const pair: [string, ___] = ["age", 25]',
      blanks: ['number'],
      explanation: '元组（Tuple）是固定长度、每个位置类型固定的数组。[string, number] 表示第一个是字符串，第二个是数字。',
    },
    {
      instruction: '只读数组：不可修改',
      template: 'const frozen: ___ string[] = ["a", "b"]\n// frozen.push("c") // 错误！',
      blanks: ['readonly'],
      explanation: 'readonly 修饰符使数组不可变：不能 push、pop、splice 等。对应写法 ReadonlyArray<string> 也等价。这在防止意外修改数据时很有用。',
    },
  ],
}

export default lesson
