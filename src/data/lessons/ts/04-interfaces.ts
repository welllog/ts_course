import type { CodeLesson } from '../../curriculum'

const lesson: CodeLesson = {
  id: 'ts-basic-04',
  moduleId: 'ts-basic',
  title: '接口 Interface',
  subtitle: 'Interfaces',
  xp: 20,
  difficulty: 'medium',
  type: 'code-challenge',
  instruction: `## 接口 Interface

接口定义对象的"形状"（shape）—— 它有哪些属性、各是什么类型。

\`\`\`ts
interface User {
  id: number
  name: string
  email?: string  // ? 表示可选属性
}
\`\`\`

接口还可以：
- 用 \`readonly\` 修饰不可变属性
- 继承其他接口（\`extends\`）
- 描述函数、索引签名等

### 任务
定义以下两个接口并实现函数：
1. \`Point\` 接口：有 \`x\` 和 \`y\` 两个 number 属性
2. \`Circle\` 接口：继承 \`Point\`（圆心），有 \`radius\` number 属性
3. \`getArea(circle: Circle): number\`：返回圆的面积（π × r²）`,
  starterCode: `// 定义 Point 接口
interface Point {
  // TODO
}

// 定义 Circle 接口，继承 Point
interface Circle {
  // TODO
}

function getArea(circle: Circle): number {
  // TODO: 返回圆面积 Math.PI * circle.radius ** 2
  return 0
}
`,
  tests: [
    {
      description: 'getArea 计算正确',
      expression: 'Math.abs(getArea({ x: 0, y: 0, radius: 5 }) - Math.PI * 25) < 0.001',
    },
    {
      description: 'getArea 半径为 1',
      expression: 'Math.abs(getArea({ x: 1, y: 2, radius: 1 }) - Math.PI) < 0.001',
    },
  ],
}

export default lesson
