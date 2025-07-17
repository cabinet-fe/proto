# 原型开发平台

这是一个专门用于生成静态原型页面的开发平台，基于 React + Vite + TypeScript + Tailwind CSS 构建。

## 特性

- 🚀 基于 Vite 的快速开发环境
- ⚛️ React 18 + TypeScript 支持
- 🎨 Tailwind CSS 样式框架
- 🔧 Radix UI 组件库
- 📱 响应式设计
- 🔄 自动页面发现和导航

## 技术栈

- **前端框架**: React 19
- **构建工具**: Vite 7
- **语言**: TypeScript 5
- **样式**: Tailwind CSS 4
- **UI 组件**: Radix UI + Lucide React
- **包管理器**: Bun

## 快速开始

### 安装依赖

```bash
bun install
```

### 启动开发服务器

```bash
bun run dev
```

### 构建生产版本

```bash
bun run build
```

## 项目结构

```
proto/
├── app.tsx              # 主应用入口组件
├── main.tsx             # React 应用入口
├── index.html           # HTML 模板
├── index.css            # 全局样式
├── pages/               # 原型页面目录
│   └── example.tsx      # 示例页面
├── components/          # 可复用组件
├── vite.config.ts       # Vite 配置
├── tailwind.config.js   # Tailwind 配置
├── tsconfig.json        # TypeScript 配置
└── package.json         # 项目配置
```

## 使用说明

### 创建新的原型页面

1. 在 `pages/` 目录下创建新的 `.tsx` 文件
2. 导出一个默认的 React 组件
3. 系统会自动识别并添加到导航菜单中

### 示例页面代码

```tsx
import React from 'react'
import { Sparkles } from 'lucide-react'

export default function MyPrototype() {
  return (
    <div className='max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold text-gray-900 mb-4'>我的原型页面</h1>
      <p className='text-gray-600'>页面内容...</p>
    </div>
  )
}
```

### 创建可复用组件

将常用的组件放在 `components/` 目录下，以便在多个原型页面中复用。

## 开发规则

1. 所有原型文件必须以 `.tsx` 格式命名
2. 文件放置在 `/pages` 目录下
3. 每个原型应该是独立的，具有完整的用户界面
4. 优先考虑复用 `/components` 中的组件
5. 保持代码简洁、可读性强

## 自动页面发现

系统使用 Vite 的 `import.meta.glob` 功能自动扫描 `pages/` 目录下的所有 `.tsx` 文件，并动态生成导航菜单。无需手动配置路由。

## 浏览器支持

- Chrome >= 87
- Firefox >= 78
- Safari >= 14
- Edge >= 88

## 许可证

MIT
