import type { CodeLesson } from '../../curriculum'

const lesson: CodeLesson = {
  id: 'ts-adv-07',
  moduleId: 'ts-adv',
  title: '条件类型',
  subtitle: 'Conditional Types',
  xp: 30,
  difficulty: 'hard',
  type: 'code-challenge',
  instruction: `## 条件类型 Conditional Types

条件类型根据类型关系返回不同的类型：

\`\`\`ts
type IsString<T> = T extends string ? "yes" : "no"
type A = IsString<string>  // "yes"
type B = IsString<number>  // "no"
\`\`\`

**内置条件类型：**
- \`NonNullable<T>\` = \`T extends null | undefined ? never : T\`
- \`Extract<T, U>\` — 从 T 中提取可赋值给 U 的类型
- \`Exclude<T, U>\` — 从 T 中排除可赋值给 U 的类型

### 任务
实现 \`flattenArray\` 函数，将嵌套数组（最多两层）拍平：`,
  starterCode: `// 条件类型练习：实现 flatten
function flattenArray<T>(arr: (T | T[])[]): T[] {
  // TODO: 将 (T | T[])[] 拍平为 T[]
  // 提示：使用 Array.isArray 判断元素是否为数组
  return []
}

// 额外挑战：类型层面
type Flatten<T> = T extends Array<infer U> ? U : T
// Flatten<string[]> 得到 string
// Flatten<number> 得到 number
`,
  tests: [
    {
      description: '拍平嵌套数组',
      expression: `JSON.stringify(flattenArray([1, [2, 3], 4, [5]])) === '[1,2,3,4,5]'`,
    },
    {
      description: '无嵌套数组不变',
      expression: `JSON.stringify(flattenArray([1, 2, 3])) === '[1,2,3]'`,
    },
    {
      description: '字符串数组拍平',
      expression: `JSON.stringify(flattenArray(["a", ["b", "c"]])) === '["a","b","c"]'`,
    },
  ],
}

export default lesson
