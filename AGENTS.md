# AGENTS

## 项目概述

本项目用于实现和快速创建前端页面来获取样式和交互灵感。

## 技术栈

本项目使用以下技术栈，**且始终使用它们的最新稳定版本**：

- `React`: UI 框架
- `Vite`: 构建工具
- `TypeScript`: 编程语言
- `Tailwind CSS`: CSS 框架
- `Radix UI`: UI 组件库
- `Lucide React`: 图标库
- `react-router-dom`: 路由
- `Bun`: 包管理器

## App 布局

- 本项目是经典的两栏布局，左侧为侧边栏，右侧为主内容区
- 侧边栏和主内容区域高度固定100%（100vh），主内容区域设置 `overflow-hidden` 以避免滚动时出现背景断层
- 页面滚动统一通过通用组件 `components/Scroll.tsx` 处理，不直接依赖浏览器原生滚动条样式

## 开发约定

- 页面放置于 `pages/` 目录下，文件名使用 kebab-case，默认导出组件即可参与自动路由，无需手动注册
- 通用 UI 放 `components/`，通用逻辑放 `utils/`；样式优先 Tailwind 工具类，类名组合用 `clsx`/`tailwind-merge`，表单等基础控件优先用 Radix UI，动画可用 framer-motion。
- 所有页面必须使用 `scroll` 组件包裹，并保证默认高度为 `100%`（`h-full`）；页面内容容器默认使用 `min-h-full`
- 页面根容器避免使用 `min-h-screen`/`h-screen` 与主布局竞争高度；若确有全屏视觉需求，也应在 `scroll` 视口内实现
- 页面编写完成后必须检查以避免错误

## 其它约定

- 不得自行启动开发服务器
