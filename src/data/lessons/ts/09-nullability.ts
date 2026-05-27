import type { CodeLesson } from '../../curriculum'

const lesson: CodeLesson = {
  id: 'ts-basic-09',
  moduleId: 'ts-basic',
  title: '可选与空值处理',
  subtitle: 'Optional & Nullability',
  xp: 25,
  difficulty: 'medium',
  type: 'code-challenge',
  instruction: `## 可选属性与空值处理

TypeScript 的严格模式下，\`null\` 和 \`undefined\` 是独立的类型。

**关键语法：**
- \`T | null\` — 可以为 null
- \`T | undefined\` — 可以为 undefined
- \`T?\` — 可选属性（等同于 T | undefined）
- \`value ?? fallback\` — 空值合并：value 为 null/undefined 时用 fallback
- \`obj?.prop\` — 可选链：安全访问可能为 null 的属性
- \`value!\` — 非空断言：告诉 TS "我保证这不是 null"

### 任务
实现 \`getUserDisplayName\` 函数：
- 接收一个 User 对象（name 可选，email 必填）
- 如果 name 存在，返回 name
- 否则返回 email 中 @ 前面的部分
- 如果 email 也没有 @，返回 "Anonymous"`,
  starterCode: `interface User {
  name?: string
  email: string
}

function getUserDisplayName(user: User): string {
  // TODO: 如果 user.name 存在，返回它
  // TODO: 否则取 user.email 中 @ 之前的部分
  // 提示：email.split("@")[0] 获取 @ 前部分
  // 提示：可以用 ?? 操作符处理空值
  return ""
}
`,
  tests: [
    { description: '有 name 时返回 name', expression: 'getUserDisplayName({ name: "Alice", email: "a@b.com" }) === "Alice"' },
    { description: '无 name 时返回 email 前缀', expression: 'getUserDisplayName({ email: "alice@example.com" }) === "alice"' },
    { description: '无 @ 的 email 返回整个 email', expression: 'getUserDisplayName({ email: "noatsign" }) === "noatsign"' },
  ],
}

export default lesson
