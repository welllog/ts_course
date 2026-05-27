import type { CodeLesson } from '../../curriculum'

const lesson: CodeLesson = {
  id: 'ts-adv-01',
  moduleId: 'ts-adv',
  title: '泛型基础',
  subtitle: 'Generics',
  xp: 25,
  difficulty: 'medium',
  type: 'code-challenge',
  instruction: `## 泛型 Generics

泛型让你写出**复用的、类型安全的**代码。泛型函数可以处理任意类型，同时保持类型信息。

\`\`\`ts
// 没有泛型：丢失类型信息
function identity(value: any): any { return value }

// 有泛型：保留类型信息
function identity<T>(value: T): T { return value }

const n = identity(42)  // n 的类型是 number
const s = identity("hi")  // s 的类型是 string
\`\`\`

### 任务
1. 实现 \`first<T>(arr: T[]): T | undefined\`：返回数组第一个元素
2. 实现 \`last<T>(arr: T[]): T | undefined\`：返回数组最后一个元素
3. 实现 \`zip<A, B>(a: A[], b: B[]): [A, B][]\`：将两个数组配对为元组数组`,
  starterCode: `function first<T>(arr: T[]): T | undefined {
  // TODO
  return undefined
}

function last<T>(arr: T[]): T | undefined {
  // TODO
  return undefined
}

function zip<A, B>(a: A[], b: B[]): [A, B][] {
  // TODO: 按较短数组的长度配对
  return []
}
`,
  tests: [
    { description: 'first 返回第一个元素', expression: 'first([1, 2, 3]) === 1' },
    { description: 'first 空数组返回 undefined', expression: 'first([]) === undefined' },
    { description: 'last 返回最后一个元素', expression: 'last(["a", "b", "c"]) === "c"' },
    {
      description: 'zip 配对两个数组',
      expression: `JSON.stringify(zip([1, 2], ["a", "b"])) === '[[1,"a"],[2,"b"]]'`,
    },
  ],
}

export default lesson
