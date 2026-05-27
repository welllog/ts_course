import type { FillLesson } from '../../curriculum'

const lesson: FillLesson = {
  id: 'ts-basic-05',
  moduleId: 'ts-basic',
  title: '类型别名与联合类型',
  subtitle: 'Type Aliases & Union',
  xp: 15,
  difficulty: 'medium',
  type: 'fill-in-blank',
  questions: [
    {
      instruction: '使用 type 创建类型别名',
      template: '___ ID = string | number',
      blanks: ['type'],
      explanation: 'type 关键字创建类型别名。这里 ID 可以是 string 或 number。类型别名和接口的主要区别：type 可以定义联合类型、交叉类型等，interface 只能描述对象形状。',
    },
    {
      instruction: '联合类型用 | 分隔',
      template: 'function format(value: string ___ number): string {\n  return String(value)\n}',
      blanks: ['|'],
      explanation: '联合类型（Union Type）表示"或"：值可以是多种类型之一。string | number 表示字符串或数字。',
    },
    {
      instruction: '交叉类型用 & 合并多个类型',
      template: 'type Admin = User ___ { role: string }',
      blanks: ['&'],
      explanation: '交叉类型（Intersection Type）用 & 合并多个类型，结果类型拥有所有类型的属性。Admin 既有 User 的属性，也有 role 属性。',
    },
    {
      instruction: '字面量类型：限定具体值',
      template: 'type Direction = "north" ___ "south" | "east" | "west"',
      blanks: ['|'],
      explanation: '字面量类型可以限定变量只能取特定的值。这比 string 更精确，TypeScript 会在赋值时检查值是否合法。',
    },
    {
      instruction: '使用 type 描述对象（类似 interface）',
      template: '___ Point = {\n  x: number\n  y: number\n}',
      blanks: ['type'],
      explanation: 'type 也可以描述对象形状。与 interface 的主要区别：type 不能被重复声明合并（declaration merging），interface 可以。',
    },
  ],
}

export default lesson
