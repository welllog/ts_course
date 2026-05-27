import type { CodeLesson } from '../../curriculum'

const lesson: CodeLesson = {
  id: 'ts-adv-04',
  moduleId: 'ts-adv',
  title: '类型守卫与窄化',
  subtitle: 'Type Guards',
  xp: 25,
  difficulty: 'hard',
  type: 'code-challenge',
  instruction: `## 类型守卫与类型窄化

类型窄化（Type Narrowing）是 TypeScript 根据条件判断缩小变量类型范围的过程。

**常用方式：**
\`\`\`ts
// typeof 守卫
if (typeof value === "string") { /* 这里 value 是 string */ }

// instanceof 守卫
if (error instanceof Error) { /* 这里 error 是 Error */ }

// in 守卫
if ("name" in obj) { /* 这里 obj 有 name 属性 */ }

// 自定义类型守卫（is）
function isString(v: unknown): v is string {
  return typeof v === "string"
}
\`\`\`

### 任务
实现一个处理多种形状的函数：
1. 定义 \`Shape\` 联合类型（Circle 有 radius，Rectangle 有 width/height，Triangle 有 base/height）
2. 使用 \`kind\` 判别字段（discriminated union）实现 \`getArea(shape: Shape): number\``,
  starterCode: `type Circle = { kind: "circle"; radius: number }
type Rectangle = { kind: "rectangle"; width: number; height: number }
type Triangle = { kind: "triangle"; base: number; height: number }
type Shape = Circle | Rectangle | Triangle

function getArea(shape: Shape): number {
  // TODO: 用 switch(shape.kind) 分别处理三种形状
  // Circle: Math.PI * radius^2
  // Rectangle: width * height
  // Triangle: 0.5 * base * height
  return 0
}
`,
  tests: [
    {
      description: '圆形面积',
      expression: 'Math.abs(getArea({ kind: "circle", radius: 5 }) - Math.PI * 25) < 0.001',
    },
    {
      description: '矩形面积',
      expression: 'getArea({ kind: "rectangle", width: 4, height: 6 }) === 24',
    },
    {
      description: '三角形面积',
      expression: 'getArea({ kind: "triangle", base: 10, height: 4 }) === 20',
    },
  ],
}

export default lesson
