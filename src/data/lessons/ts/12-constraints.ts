import type { CodeLesson } from '../../curriculum'

const lesson: CodeLesson = {
  id: 'ts-adv-02',
  moduleId: 'ts-adv',
  title: '泛型约束',
  subtitle: 'Generic Constraints',
  xp: 25,
  difficulty: 'hard',
  type: 'code-challenge',
  instruction: `## 泛型约束 extends

有时泛型不能是"任意类型"，需要限制它满足某些条件。

\`\`\`ts
// T 必须有 length 属性
function getLength<T extends { length: number }>(value: T): number {
  return value.length
}

getLength("hello")  // OK
getLength([1, 2, 3])  // OK
getLength(42)  // 错误！number 没有 length
\`\`\`

**keyof 约束：**
\`\`\`ts
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}
\`\`\`

### 任务
1. 实现 \`pluck<T, K extends keyof T>(arr: T[], key: K): T[K][]\`
   — 从对象数组中提取某个属性值组成新数组
2. 实现 \`minBy<T extends Record<string, number>>(arr: T[], key: keyof T): T | undefined\`
   — 返回某数字属性最小的元素`,
  starterCode: `function pluck<T, K extends keyof T>(arr: T[], key: K): T[K][] {
  // TODO: 返回每个元素的 [key] 属性值组成的数组
  return []
}

function minBy<T extends Record<string, number>>(arr: T[], key: keyof T): T | undefined {
  // TODO: 返回 key 属性值最小的元素
  return undefined
}
`,
  tests: [
    {
      description: 'pluck 提取属性',
      expression: `JSON.stringify(pluck([{name:"A",age:1},{name:"B",age:2}], "name")) === '["A","B"]'`,
    },
    {
      description: 'minBy 找最小值元素',
      expression: `minBy([{score:90},{score:70},{score:85}], "score")?.score === 70`,
    },
    { description: 'minBy 空数组返回 undefined', expression: 'minBy([], "score") === undefined' },
  ],
}

export default lesson
