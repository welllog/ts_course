import type { CodeLesson } from '../../curriculum'

const lesson: CodeLesson = {
  id: 'ts-adv-03',
  moduleId: 'ts-adv',
  title: '工具类型',
  subtitle: 'Utility Types',
  xp: 30,
  difficulty: 'hard',
  type: 'code-challenge',
  instruction: `## 内置工具类型 Utility Types

TypeScript 内置了很多实用的泛型类型：

| 工具类型 | 作用 |
|---------|------|
| \`Partial<T>\` | 所有属性变为可选 |
| \`Required<T>\` | 所有属性变为必填 |
| \`Readonly<T>\` | 所有属性变为只读 |
| \`Pick<T, K>\` | 只保留指定属性 |
| \`Omit<T, K>\` | 排除指定属性 |
| \`Record<K, V>\` | 创建键值对类型 |
| \`ReturnType<T>\` | 获取函数返回类型 |
| \`Parameters<T>\` | 获取函数参数类型元组 |

### 任务
使用工具类型实现以下函数（利用类型，不需要复杂逻辑）：
1. \`updateUser(user, updates)\`：使用 \`Partial<User>\` 合并更新
2. \`pickUserInfo(user)\`：使用 \`Pick\` 只返回 name 和 email
3. \`createRoleMap(roles)\`：使用 \`Record\` 创建角色 -> 权限的映射`,
  starterCode: `interface User {
  id: number
  name: string
  email: string
  password: string
}

// 使用 Partial<User> 合并更新
function updateUser(user: User, updates: Partial<User>): User {
  // TODO: 返回合并后的新对象（不修改原对象）
  return user
}

// 使用 Pick 只返回公开信息
function pickUserInfo(user: User): Pick<User, "name" | "email"> {
  // TODO
  return { name: "", email: "" }
}

// 使用 Record 创建映射
function createRoleMap(roles: string[]): Record<string, string[]> {
  // TODO: 返回 { roleName: ["read", "write"] } 格式（每个角色都有 ["read"] 权限）
  return {}
}
`,
  tests: [
    {
      description: 'updateUser 合并更新',
      expression: `updateUser({id:1,name:"A",email:"a@b.com",password:"x"},{name:"B"}).name === "B"`,
    },
    {
      description: 'updateUser 不修改原对象',
      expression: `(() => { const u = {id:1,name:"A",email:"a@b.com",password:"x"}; updateUser(u,{name:"B"}); return u.name === "A" })()`,
    },
    {
      description: 'pickUserInfo 只返回 name/email',
      expression: `(() => { const r = pickUserInfo({id:1,name:"A",email:"a@b.com",password:"x"}); return r.name === "A" && r.email === "a@b.com" })()`,
    },
    {
      description: 'createRoleMap 包含 read 权限',
      expression: `createRoleMap(["admin", "user"])["admin"].includes("read")`,
    },
  ],
}

export default lesson
