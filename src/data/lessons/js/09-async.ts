import type { CodeLesson } from '../../curriculum'

const lesson: CodeLesson = {
  id: 'js-09',
  moduleId: 'js',
  title: 'Promise 与 async/await',
  subtitle: 'Asynchronous JS',
  xp: 25,
  difficulty: 'medium',
  type: 'code-challenge',
  instruction: `## Promise 与 async/await

JavaScript 是单线程的，但通过异步机制处理耗时操作（网络请求、文件读取等）。

**Promise** 表示一个将来才会完成的操作，有三种状态：
- pending（等待中）
- fulfilled（已完成）
- rejected（已失败）

**async/await** 是 Promise 的语法糖，让异步代码读起来像同步代码。

### 任务
实现 \`fetchUser\` 函数，使用 async/await：
1. 调用已提供的 \`getUser(id)\` 函数（返回 Promise）
2. 如果 id <= 0，抛出错误 \`"Invalid ID"\`
3. 返回用户对象`,
  starterCode: `// 已提供的模拟 API（不要修改）
function getUser(id: number): Promise<{ id: number; name: string }> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, name: \`User \${id}\` }), 10)
  })
}

// 实现此函数
async function fetchUser(id: number) {
  // TODO: 如果 id <= 0，throw new Error("Invalid ID")
  // TODO: 使用 await 调用 getUser(id) 并返回结果
}
`,
  tests: [
    { description: 'fetchUser(1) 返回正确用户', expression: '(await fetchUser(1)).name === "User 1"' },
    { description: 'fetchUser(5) 返回 id 为 5 的用户', expression: '(await fetchUser(5)).id === 5' },
    {
      description: 'fetchUser(-1) 抛出错误',
      expression: 'await fetchUser(-1).catch(e => e.message) === "Invalid ID"',
    },
  ],
}

export default lesson
