import type { CodeLesson } from '../../curriculum'

const lesson: CodeLesson = {
  id: 'ts-adv-09',
  moduleId: 'ts-adv',
  title: '读懂 React 源码类型',
  subtitle: 'Reading React Types',
  xp: 30,
  difficulty: 'hard',
  type: 'code-challenge',
  instruction: `## 读懂 React 的 TypeScript 类型

React 的类型定义（@types/react）大量使用了我们学过的所有概念。

**常见 React 类型：**
\`\`\`ts
// ReactNode：任何可渲染的内容
type ReactNode = ReactElement | string | number | boolean | null | undefined

// FC（函数组件）本质上是
type FC<P = {}> = (props: P & { children?: ReactNode }) => ReactElement | null

// useState 返回值
function useState<S>(init: S): [S, Dispatch<SetStateAction<S>>]

// useCallback 约束类型
function useCallback<T extends Function>(callback: T, deps: DependencyList): T
\`\`\`

### 任务
不使用任何 React 导入，手动实现简化版的 React 类型工具：
1. 类型 \`SimpleFC<P>\`：函数组件类型（接收 props 返回 string 的简化版）
2. 实现 \`createState<T>(initial: T)\`：返回 [getter, setter] 元组`,
  starterCode: `// 简化版函数组件类型
type SimpleFC<P extends object = {}> = (props: P) => string

// 实现简化版 createState
function createState<T>(initial: T): [() => T, (newVal: T) => void] {
  // TODO: 用闭包保存状态
  // 返回 [getter函数, setter函数]
  return [() => initial, (_v: T) => {}]
}

// 使用示例
const Counter: SimpleFC<{ label: string }> = (props) => {
  return \`Counter: \${props.label}\`
}
`,
  tests: [
    { description: 'createState getter 返回初始值', expression: 'createState(0)[0]() === 0' },
    {
      description: 'createState setter 更新值',
      expression: `(() => {
  const [get, set] = createState("hello")
  set("world")
  return get() === "world"
})()`,
    },
    { description: 'SimpleFC 类型可以正确调用', expression: `Counter({ label: "test" }) === "Counter: test"` },
  ],
}

export default lesson
