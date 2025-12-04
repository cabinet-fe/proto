# AGENTS

## 项目画像
- 原型开发平台，技术栈：React 19 + Vite 7 + TypeScript 5 + Tailwind CSS 4，搭配 Radix UI、Lucide React，路由使用 react-router-dom@7。
- 包管理与脚本：Bun；常用命令 `bun install`、`bun run dev`、`bun run build`、`bun run preview`、`bun run lint`。
- 入口结构：`main.tsx` 挂载 `app.tsx`，`app.tsx` 通过 `import.meta.glob('./pages/*.tsx')` 动态收集页面并生成导航。

## 开发约定
- 沟通与注释统一使用中文；保持 TypeScript 严格模式（已开启 strict），优先使用函数组件与现代 React API（hooks、Suspense、lazy）。
- 新页面：放置于 `pages/`，文件名使用 kebab-case，默认导出组件即可参与自动路由，无需手动注册。
- 复用：通用 UI 放 `components/`，通用逻辑放 `utils/`；样式优先 Tailwind 工具类，类名组合用 `clsx`/`tailwind-merge`，表单等基础控件优先用 Radix UI，动画可用 framer-motion。
- UI 规范：保持响应式与可访问性（aria 属性、键盘与焦点状态），善用现代 CSS/JS 能力，避免过时 API。
- 示例：新增 `pages/aurora-login.tsx` 现代玻璃拟态登录页，可复用布局/按钮/输入焦点交互模式。

## 质量与检查
- 每次改动需保证“先修复报错再提交”；提交前至少运行 `bun run lint` 与 `bun run build` 确认无类型/构建错误。
- 变更说明需注明意图、边界与潜在风险，涉及交互的变更请验证在窄屏与桌面端的表现。

## 文档维护
- 每次新增功能或调整规范后，增量更新本文件保持约定与实现同步；README 侧重用户说明，本文件记录开发者工作流与约束。
