# TypeScript Course App

一个基于 Vite + React + TypeScript 的交互式课程学习项目，包含 JavaScript 基础、TypeScript 入门和进阶内容，适合用于练习类型系统、做题和代码挑战。

## 技术栈

- React 18
- TypeScript 5
- Vite 5
- React Router
- Zustand
- Framer Motion
- Monaco Editor
- Tailwind CSS

## 项目结构

```text
src/
  components/   课程页面、布局和题型组件
  data/         课程数据、题目数据和加载逻辑
  hooks/        自定义 Hooks
  pages/        首页、模块页和课程页
  store/        学习进度状态管理
```

## 本地开发

### 环境要求

- Node.js 18 或更高版本
- npm

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

启动后打开终端提示的本地地址，通常是 `http://localhost:5173`。

## 调试

### 1. 浏览器调试

使用 Chrome 或 Edge 打开开发服务器地址，通过浏览器开发者工具排查页面渲染、样式和控制台报错。

### 2. TypeScript 类型检查

项目在构建时会先执行类型检查：

```bash
npm run build
```

如果有类型错误，先修复 TypeScript 报错，再继续调试页面逻辑。

### 3. 预览生产构建

```bash
npm run build
npm run preview
```

`preview` 会启动一个本地静态服务，用于检查打包后的页面是否正常。

### 4. 常见排查点

- 页面空白：检查控制台是否有运行时错误。
- 路由异常：确认 `src/router.tsx` 的路由配置是否正确。
- 题目数据异常：检查 `src/data/curriculum.ts` 和 `src/data/lessons/` 下的课程数据。
- 状态异常：检查 `src/store/useProgressStore.ts` 中的进度存储逻辑。

## 构建

```bash
npm run build
```

构建前会自动执行 Monaco 静态资源同步脚本，把 `node_modules/monaco-editor/min/vs` 复制到 `public/monaco/vs`，然后再输出生产构建。

构建产物会输出到 `dist/` 目录。

## 部署

这是一个标准的静态前端应用，推荐部署到支持静态站点托管的平台，例如 Vercel、Netlify、Cloudflare Pages、GitHub Pages，或者任意支持 `dist/` 目录部署的静态服务器。

当前项目的部署目标是：服务器从仓库拉取代码后，只需执行 `npm install` 和 `npm run build`，不需要手动准备 Monaco 资源，也不依赖 Google Fonts 等外部网络资源。

### 部署前检查

1. 确认本地构建成功：`npm run build`
2. 确认 `dist/` 目录生成正常
3. 确认路由在目标平台上使用了 SPA 回退配置
4. 确认部署环境会先安装依赖，再执行构建命令

### 通用部署步骤

1. 在服务器或 CI 环境执行 `npm install` 或 `npm ci`
2. 执行 `npm run build`
3. 将 `dist/` 目录上传到静态托管服务
4. 配置站点根目录指向 `dist/`
5. 如果使用前端路由，配置所有未命中的路径回退到 `index.html`

### Monaco 说明

- 仓库中不需要提交 `public/monaco/vs` 目录。
- `npm run build` 和 `npm run dev` 前会自动执行 `npm run sync:monaco`。
- 该脚本会从本地安装的 `monaco-editor` 依赖复制运行所需资源，因此部署机必须先完成依赖安装。

### 离线运行说明

- 页面不再依赖在线字体资源。
- Monaco 编辑器资源从站点自身的 `/monaco/vs` 路径加载。
- 只要构建完成并正确部署 `dist/`，生产环境无需连接互联网即可正常运行。

### GitHub Pages

如果部署到 GitHub Pages，需要确保构建后的静态资源路径与仓库部署路径一致。若项目未来要固定发布到 GitHub Pages，可根据实际仓库路径补充 `base` 配置。

## 可用脚本

```bash
npm run sync:monaco  # 同步 Monaco 静态资源到 public/monaco/vs
npm run dev      # 启动开发服务器
npm run build    # 类型检查并构建生产包
npm run preview  # 本地预览构建结果
```

## English

This project is an interactive learning app built with Vite, React, and TypeScript. It includes JavaScript fundamentals, TypeScript basics, and advanced TypeScript lessons.

### Development

```bash
npm install
npm run dev
```

### Debugging

- Use browser DevTools to inspect console errors and UI issues.
- Run `npm run build` to catch TypeScript and bundling issues.
- Run `npm run preview` to verify the production build locally.

### Deployment

Run `npm install` first, then `npm run build`. The build process automatically syncs local Monaco assets before generating `dist/`, so the deployed site can run without external font or CDN dependencies.
