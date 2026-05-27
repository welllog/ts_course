import type { MCQLesson } from '../../curriculum'

const lesson: MCQLesson = {
  id: 'ts-basic-07',
  moduleId: 'ts-basic',
  title: '枚举 Enum',
  subtitle: 'Enums',
  xp: 15,
  difficulty: 'medium',
  type: 'multiple-choice',
  questions: [
    {
      text: '什么是 TypeScript 枚举（Enum）？',
      options: [
        '一组命名的常量集合',
        '一种特殊的数组',
        '只能包含数字的类型',
        '与 JavaScript 的 Symbol 相同',
      ],
      correct: 0,
      explanation: 'enum 定义一组命名常量。默认从 0 开始自动编号（数字枚举），也可以使用字符串枚举。它让代码更易读，避免魔法数字/字符串。',
    },
    {
      text: '下面数字枚举中，Direction.South 的值是多少？',
      code: `enum Direction {
  North,
  South,
  East,
  West
}`,
      options: ['1', '0', '2', '"South"'],
      correct: 0,
      explanation: '数字枚举默认从 0 开始。North=0，South=1，East=2，West=3。可以通过 Direction[1] 反向查找得到 "South"。',
    },
    {
      text: '字符串枚举的优势是什么？',
      code: `enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
  Pending = "PENDING"
}`,
      options: [
        '序列化后更易读，调试时直接看到字符串值',
        '比数字枚举运行更快',
        '支持反向映射（通过值查找键）',
        '字符串枚举没有优势',
      ],
      correct: 0,
      explanation: '字符串枚举的每个成员必须手动赋值，但序列化时（如 JSON、日志）更易读。数字枚举支持反向映射，字符串枚举不支持。',
    },
    {
      text: '现代 TypeScript 中，什么是比 enum 更推荐的替代方案？',
      code: `// 替代 enum Direction { North, South }
const Direction = {
  North: "north",
  South: "south",
} as const

type Direction = typeof Direction[keyof typeof Direction]`,
      options: [
        'as const 对象 + 类型提取，纯 JS 运行时无额外代码',
        '字面量类型联合：type Direction = 0 | 1 | 2',
        '用数组代替：const directions = ["north", "south"]',
        '用类（class）代替',
      ],
      correct: 0,
      explanation: 'enum 会编译为 JavaScript 代码（额外的运行时对象）。as const 对象是纯 JS，类型提取用 keyof typeof。这种写法在现代 TS 项目中越来越流行。',
    },
  ],
}

export default lesson
