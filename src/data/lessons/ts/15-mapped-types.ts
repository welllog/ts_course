import type { CodeLesson } from '../../curriculum'

const lesson: CodeLesson = {
  id: 'ts-adv-05',
  moduleId: 'ts-adv',
  title: '映射类型',
  subtitle: 'Mapped Types',
  xp: 30,
  difficulty: 'hard',
  type: 'code-challenge',
  instruction: `## 映射类型 Mapped Types

映射类型通过遍历现有类型的键来创建新类型：

\`\`\`ts
// 将所有属性变为可选（Partial 的实现原理）
type MyPartial<T> = {
  [K in keyof T]?: T[K]
}

// 将所有值包装为 Promise
type Promisify<T> = {
  [K in keyof T]: Promise<T[K]>
}
\`\`\`

### 任务
实现以下自定义映射类型（类型级别）和对应的运行时函数：
1. 类型 \`Nullable<T>\`：将 T 的所有属性值变为 \`T[K] | null\`
2. 函数 \`mapValues<T, U>(obj: T, fn: (val: T[keyof T]) => U)\`：对对象每个值应用函数，返回同键的新对象`,
  starterCode: `// 定义 Nullable 映射类型
type Nullable<T> = {
  // TODO: [K in keyof T]: T[K] | null
}

// 实现 mapValues
function mapValues<T extends object, U>(
  obj: T,
  fn: (val: T[keyof T]) => U
): Record<keyof T, U> {
  // TODO: 遍历 obj，对每个值应用 fn
  return {} as Record<keyof T, U>
}
`,
  tests: [
    {
      description: 'mapValues 转换值',
      expression: `JSON.stringify(mapValues({a:1,b:2}, x => x * 2)) === '{"a":2,"b":4}'`,
    },
    {
      description: 'mapValues 转换为字符串',
      expression: `mapValues({x:10}, x => String(x)).x === "10"`,
    },
  ],
}

export default lesson
