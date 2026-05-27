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

构建产物会输出到 `dist/` 目录。

## 部署

这是一个标准的静态前端应用，推荐部署到支持静态站点托管的平台，例如 Vercel、Netlify、Cloudflare Pages、GitHub Pages，或者任意支持 `dist/` 目录部署的静态服务器。

### 部署前检查

1. 确认本地构建成功：`npm run build`
2. 确认 `dist/` 目录生成正常
3. 确认路由在目标平台上使用了 SPA 回退配置

### 通用部署步骤

1. 执行 `npm run build`
2. 将 `dist/` 目录上传到静态托管服务
3. 配置站点根目录指向 `dist/`
4. 如果使用前端路由，配置所有未命中的路径回退到 `index.html`

### GitHub Pages

如果部署到 GitHub Pages，需要确保构建后的静态资源路径与仓库部署路径一致。若项目未来要固定发布到 GitHub Pages，可根据实际仓库路径补充 `base` 配置。

## 可用脚本

```bash
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

Build the project with `npm run build`, then deploy the generated `dist/` folder to any static hosting provider such as Vercel, Netlify, Cloudflare Pages, or GitHub Pages.
