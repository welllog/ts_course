import type { CodeLesson } from '../../curriculum'

const lesson: CodeLesson = {
  id: 'ts-basic-06',
  moduleId: 'ts-basic',
  title: '函数类型',
  subtitle: 'Function Types',
  xp: 20,
  difficulty: 'medium',
  type: 'code-challenge',
  instruction: `## 函数类型

TypeScript 可以精确描述函数的参数类型和返回类型。

**函数类型写法：**
\`\`\`ts
// 类型别名描述函数类型
type Transformer = (input: string) => string

// 接口描述函数类型
interface Predicate {
  (value: number): boolean
}
\`\`\`

**泛型函数预览（后面会深入学习）：**
\`\`\`ts
function identity<T>(value: T): T {
  return value
}
\`\`\`

### 任务
1. 定义类型 \`Callback = (error: string | null, result: number) => void\`
2. 实现 \`applyOp(a, b, op)\`：接受两个数字和一个操作函数 \`(a: number, b: number) => number\`，返回操作结果
3. 实现 \`compose(f, g)\`：函数组合，返回 \`x => f(g(x))\`，参数和返回值均为 number`,
  starterCode: `// 定义 Callback 类型
type Callback = (error: string | null, result: number) => void

// 实现 applyOp
function applyOp(a: number, b: number, op: (a: number, b: number) => number): number {
  // TODO
  return 0
}

// 实现 compose（函数组合）
function compose(f: (x: number) => number, g: (x: number) => number) {
  // TODO: 返回一个函数，先执行 g 再执行 f
  return (x: number) => 0
}
`,
  tests: [
    { description: 'applyOp 加法', expression: 'applyOp(3, 4, (a, b) => a + b) === 7' },
    { description: 'applyOp 乘法', expression: 'applyOp(3, 4, (a, b) => a * b) === 12' },
    { description: 'compose 函数组合', expression: 'compose(x => x + 1, x => x * 2)(5) === 11' },
    { description: 'compose 顺序正确', expression: 'compose(x => x * 2, x => x + 1)(5) === 12' },
  ],
}

export default lesson
