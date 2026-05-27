import type { MCQLesson } from '../../curriculum'

const lesson: MCQLesson = {
  id: 'ts-basic-08',
  moduleId: 'ts-basic',
  title: '类型推断',
  subtitle: 'Type Inference',
  xp: 15,
  difficulty: 'easy',
  type: 'multiple-choice',
  questions: [
    {
      text: 'TypeScript 可以推断出 x 的类型是什么？',
      code: 'const x = 42',
      options: ['number', 'any', 'unknown', '42（字面量类型）'],
      correct: 3,
      explanation: 'const 声明时，TypeScript 推断为字面量类型 42，而非宽泛的 number。这是因为 const 的值不会改变。如果是 let x = 42，则推断为 number。',
    },
    {
      text: '下面函数的返回类型会被推断为什么？',
      code: 'function double(n: number) {\n  return n * 2\n}',
      options: ['number', 'any', '需要手动标注才能知道', 'void'],
      correct: 0,
      explanation: 'TypeScript 会根据函数体推断返回类型。n * 2 是 number 运算，所以返回类型被推断为 number。不必手动写 : number。',
    },
    {
      text: '什么情况下建议手动添加类型注解？',
      options: [
        '公共函数的参数和返回值，以及类的公共属性',
        '所有地方都要手动注解',
        '只在变量声明时注解',
        '只在推断不出类型时注解',
      ],
      correct: 0,
      explanation: '最佳实践：让 TypeScript 推断局部变量和简单表达式的类型；对公共 API（函数参数/返回值、类属性）显式标注，作为"文档"并防止接口变化。',
    },
    {
      text: '类型拓宽（type widening）是什么？',
      code: 'let greeting = "hello"  // 推断为 string，而非 "hello"',
      options: [
        'let 声明时，字面量类型被拓宽为更宽泛的基础类型',
        '手动将类型变宽的操作',
        '类型断言的别称',
        'TypeScript 的一个 bug',
      ],
      correct: 0,
      explanation: 'let 声明的变量可以被重新赋值，所以 TypeScript 将 "hello" 拓宽为 string。const 不会拓宽，因为值固定。可以用 as const 或显式注解阻止拓宽。',
    },
  ],
}

export default lesson
