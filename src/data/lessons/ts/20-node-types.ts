import type { CodeLesson } from '../../curriculum'

const lesson: CodeLesson = {
  id: 'ts-adv-10',
  moduleId: 'ts-adv',
  title: '读懂 Node/Express 类型',
  subtitle: 'Reading Node Types',
  xp: 30,
  difficulty: 'hard',
  type: 'code-challenge',
  instruction: `## 读懂 Node.js & Express 的类型

Node.js 生态的类型模式与 React 略有不同，大量使用接口继承和泛型约束。

**Express 典型类型：**
\`\`\`ts
// Request 和 Response 是泛型接口
interface Request<
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = ParsedQs
> { ... }

// 路由处理器类型
type RequestHandler<P, ResBody, ReqBody, ReqQuery> =
  (req: Request<P, ResBody, ReqBody, ReqQuery>,
   res: Response<ResBody>,
   next: NextFunction) => void
\`\`\`

### 任务
模拟一个简化版的 Express 风格路由系统，使用 TypeScript 类型约束：`,
  starterCode: `// 简化版 Express 类型
interface SimpleRequest<TBody = unknown> {
  body: TBody
  params: Record<string, string>
  query: Record<string, string>
}

interface SimpleResponse {
  statusCode: number
  json<T>(data: T): void
  status(code: number): SimpleResponse
}

type Handler<TBody = unknown> = (
  req: SimpleRequest<TBody>,
  res: SimpleResponse
) => void

// 实现一个简化版 createRouter
function createRouter() {
  const routes: Array<{ method: string; path: string; handler: Handler }> = []

  return {
    get(path: string, handler: Handler) {
      // TODO: 添加到 routes，method 为 "GET"
    },
    post<TBody>(path: string, handler: Handler<TBody>) {
      // TODO: 添加到 routes，method 为 "POST"
    },
    getRoutes() {
      return routes
    },
  }
}
`,
  tests: [
    {
      description: 'router.get 注册路由',
      expression: `(() => {
  const r = createRouter()
  r.get("/users", (req, res) => {})
  return r.getRoutes().length === 1
})()`,
    },
    {
      description: 'router.post 注册路由',
      expression: `(() => {
  const r = createRouter()
  r.post("/users", (req, res) => {})
  return r.getRoutes()[0]?.method === "POST"
})()`,
    },
    {
      description: '路由路径保存正确',
      expression: `(() => {
  const r = createRouter()
  r.get("/test", (req, res) => {})
  return r.getRoutes()[0]?.path === "/test"
})()`,
    },
  ],
}

export default lesson
