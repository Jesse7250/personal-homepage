# 个人展示网站 技术设计文档（TECH_DESIGN.md）

> 本文件用于说明项目的技术实现方案，让 AI 明确技术栈、项目结构、数据模型与关键技术点，据此生成高质量代码。

---

## 一、技术栈选择

| 层 | 选型 | 说明 |
|---|---|---|
| 前端框架 | React 18 + TypeScript | 组件化、类型安全，严格类型定义 |
| 构建工具 | Vite | 启动快、热更新，适合纯静态前端 |
| 样式方案 | Tailwind CSS | 工具类样式，统一风格，不写大量独立 css |
| 路由 | react-router-dom | 前台/后台路由隔离 + 路由守卫 |
| Markdown 渲染 | react-markdown + remark-gfm | 博客/项目详情内容渲染 |
| 代码高亮 | rehype-highlight | 博客代码块高亮 |
| 表单校验 | react-hook-form + zod | 轻量、类型安全校验 |
| 本地存储 | 浏览器 localStorage | 模拟后端数据库，无需服务器 |
| 星空动画 | Canvas | 实现深色星空粒子背景 |
| 部署 | Vercel / Cloudflare Pages | 静态托管，自动部署 |

**说明**：本期不引入真实后端与数据库，全部数据通过 `localStorage` 模拟存储；API 层统一封装，便于后续无缝切换真实后端。

---

## 二、项目目录结构

```
项目根目录
├── index.html                 # Vite 入口 HTML
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── PRD.md                     # 产品需求文档
├── TECH_DESIGN.md             # 本文件（技术设计文档）
├── AGENTS.md                  # AI 开发规范
└── src/
    ├── main.tsx               # 应用入口
    ├── App.tsx                # 根组件 + 路由配置
    ├── assets/                # 静态资源（图片、svg 图标）
    ├── types/                 # TS 类型定义
    │   ├── profile.ts
    │   ├── skill.ts
    │   ├── project.ts
    │   ├── post.ts
    │   └── user.ts
    ├── api/                   # 统一数据接口层（localStorage 实现）
    │   ├── auth.ts            # 登录/登出/校验
    │   ├── profile.ts         # 个人信息读写
    │   ├── skills.ts          # 技能增删改查
    │   ├── projects.ts        # 项目增删改查
    │   ├── posts.ts           # 博客增删改查
    │   └── index.ts           # 接口统一导出
    ├── hooks/                 # 自定义 Hook
    │   ├── useAuth.ts         # 登录态
    │   ├── useLocalStorage.ts # 本地存储读写
    │   └── useRouteGuard.ts   # 路由守卫
    ├── utils/                 # 工具函数
    │   └── starfield.ts       # Canvas 星空粒子
    ├── components/            # 通用组件
    │   ├── layout/            # 前台布局
    │   │   ├── Navbar.tsx     # 前台导航
    │   │   ├── Footer.tsx     # 页脚
    │   │   └── Starfield.tsx  # 星空背景
    │   ├── admin-layout/      # 后台布局
    │   │   ├── AdminSidebar.tsx
    │   │   └── AdminTopbar.tsx
    │   └── MarkdownEditor.tsx # Markdown 编辑器（实时预览）
    └── pages/                 # 页面组件
        ├── Home.tsx           # 首页（Hero + 介绍 + 技能 + 项目 + 博客 + 联系）
        ├── About.tsx          # 个人介绍页
        ├── Skills.tsx         # 技能页
        ├── Projects.tsx       # 项目列表页
        ├── ProjectDetail.tsx  # 项目详情页
        ├── BlogList.tsx       # 博客列表页
        ├── BlogDetail.tsx     # 博客详情页（Markdown + 代码高亮 + TOC）
        ├── Contact.tsx        # 联系页
        └── admin/             # 后台全部页面
            ├── Login.tsx      # 登录页
            ├── Dashboard.tsx  # 仪表盘
            ├── ProfileEdit.tsx # 个人信息管理
            ├── SkillsManage.tsx # 技能管理
            ├── ProjectsManage.tsx # 项目管理
            ├── PostsManage.tsx # 博客管理
            └── Settings.tsx   # 站点设置
```

---

## 三、数据模型

全部类型使用 TypeScript 严格定义，存储于 `src/types/`。

### 1. Profile（个人信息）
```ts
export interface Profile {
  name: string;          // 姓名
  position: string;      // 职位/身份
  avatar: string;        // 头像 URL
  bio: string;           // 一句话介绍
  education: string[];   // 教育背景
  experiences: Array<{   // 经历时间线
    title: string;
    org: string;
    date: string;
    desc: string;
  }>;
  contact: {             // 联系方式
    email: string;
    github: string;
    linkedin?: string;
  };
}
```

### 2. Skill（技能）
```ts
export interface Skill {
  id: string;            // 唯一 id
  name: string;          // 技能名
  icon: string;          // 图标
  category: string;      // 分类（前端/后端/工具等）
  level: string;         // 熟练度（入门/熟悉/精通）
}
```

### 3. Project（项目）
```ts
export interface Project {
  id: string;            // 唯一 id
  title: string;         // 项目标题
  desc: string;          // 项目描述
  content?: string;      // 详情 Markdown 内容
  cover: string;         // 封面图 URL
  tags: string[];        // 技术标签
  link: string;          // 项目链接
  date: string;          // 完成日期
}
```

### 4. Post（博客）
```ts
export interface Post {
  id: string;            // 唯一 id
  title: string;         // 标题
  summary: string;       // 摘要
  content: string;       // Markdown 正文
  tags: string[];        // 标签
  cover?: string;        // 封面图
  date: string;          // 发布日期
}
```

### 5. User（后台登录用户）
```ts
export interface User {
  username: string;      // 账号
  token: string;         // 登录 token（不存明文密码）
}
```

---

## 四、关键技术点

### 4.1 路由守卫（后台访问拦截）
- 定义 `RequireAuth` 组件包裹 `/admin/*` 全部路由
- 读取 `useAuth().isAuthenticated`，未登录时 `<Navigate to="/admin/login" />`
- 登录成功后将 token 写入 localStorage

### 4.2 前后台布局隔离
- 前台：普通布局（Navbar + Footer）
- 后台：独立 `admin-layout`（侧边栏 + 顶栏），不复用前台 Navbar
- 通过路由嵌套实现两种布局隔离

### 4.3 Canvas 星空粒子
- `utils/starfield.ts` 实现粒子生成、缓慢闪烁、视差滚动
- 移动端（屏幕宽度 < 768px）自动降低粒子数量
- 尊重 `prefers-reduced-motion`，用户偏好减少动画时降级为静态背景

### 4.4 localStorage 统一接口层
- `src/api/` 统一封装所有数据读写，页面组件不直接操作 localStorage
- 每个实体一个模块（auth / profile / skills / projects / posts）
- 后续切换真实后端时，仅需替换 `src/api/` 内部实现，不改动页面

### 4.5 Markdown 编辑器与渲染
- 后台使用 `MarkdownEditor.tsx`，支持实时预览
- 前台博客/项目详情用 `react-markdown` + `remark-gfm` 渲染
- 代码块通过 `rehype-highlight` 高亮
- TOC 目录通过解析标题生成锚点跳转

### 4.6 表单校验
- 使用 `react-hook-form` + `zod` 定义校验规则
- 登录、个人信息、项目、博客表单均校验
- 所有删除操作二次确认（弹窗）

---

## 五、部署方案

1. 代码推送到 GitHub 仓库
2. 登录 Vercel 或 Cloudflare Pages，导入 GitHub 仓库
3. Vercel：框架自动识别 Vite，构建命令默认 `npm run build`，输出目录 `dist`
4. Cloudflare Pages：框架预设选「无」，构建命令 `npm run build`，构建输出目录 `dist`
5. 部署完成，获取公网域名
