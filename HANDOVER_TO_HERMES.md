# HANDOVER TO HERMES — 注安师免费学习平台

> **交接日期**: 2026-05-25
> **项目根目录**: `c:/Users/ThinkPad/Downloads/safe-exam/`
> **交接人**: Claude (前一任 AI 助手)
> **目标读者**: HERMES (下一任 AI 助手)

---

## 1. 项目概述

- **项目名称**: 注安师免费学习平台 (safe-exam)
- **核心目标**: 为"中级注册安全工程师"考试搭建 100% 免费、高质量的学习平台。Phase 1 做透《安全生产法律法规》一科（20 章），后续扩展其余 3 科。
- **商业模式**: 内容 100% 免费 → SEO 获取流量 → 线索收集表单 (Leads) 卖给培训机构 + 广告变现
- **目标用户**: 中国注安师考生（以移动端为主）
- **用户（站主）**: 编程小白，需要极其简单的内容更新工作流。手上有 ~100GB 学习资料（PDF 讲义、PDF 思维导图、练习题），需要被消化整理后逐章放入网站。

---

## 2. 当前完成状态

### 2.1 已实现的功能模块

**代码脚手架 — 100% 完成**
- Next.js 14 App Router + TypeScript + Tailwind CSS 完整项目骨架
- 静态导出 (`output: "export"`)，无需服务器，部署到 Vercel 免费层
- 全站 62 个页面全部通过 `npm run build` 构建成功

**首页** (`/`)
- Hero 区域 + 4 科科目卡片 + 6 个特色功能介绍卡片

**科目首页** (`/laws`)
- 章节卡片网格（含考试权重星级标识）
- 3 个快捷入口：B站视频课程、易混知识点对比、思维导图
- 底部线索收集表单 (LeadForm，动态加载，ssr: false)

**章节内容页** (`/laws/chapter-XX`)
- MDX 内容渲染（通过 `next-mdx-remote/rsc` 编译时处理）
- 自定义 MDX 组件：Callout（提示框）、LawArticle（法条引用）、KeyPoint（考点标记）、ExamTip（应试技巧）、ComparisonTable（对比表）、VideoCard（B站视频卡片）、MindMapEmbed（思维导图嵌入）
- 章尾导航（上一章/下一章）
- 章节测验入口 CTA
- 面包屑导航 + SEO metadata + JSON-LD 结构化数据
- 底部线索收集表单

**章节测验** (`/laws/chapter-XX/quiz`)
- 完整测验状态机：空闲 → 答题中 → 已提交 → 回顾
- 单选/多选/判断三种题型
- 即时批改 + 答案解析展示
- 成绩统计（正确率、正确/错误/未答数量）
- localStorage 进度持久化（跨会话保留）
- 回顾模式（显示所有题目的正确/错误标记）

**B站视频索引** (`/laws/bisai`)
- 按章节编排的视频列表，VideoCard 组件（渐变占位图，无外部 API 调用）

**易混知识点对比** (`/laws/compare`)
- ComparisonTable 组件渲染对比表

**思维导图** (`/laws/mindmaps`)
- 思维导图列表，MindMapEmbed 组件（懒加载 iframe，ProcessOn 嵌入）

**全文搜索** (`/search`)
- Pagefind 集成（通过 Script 标签加载，客户端轮询 `window.PagefindUI`）
- 中文搜索支持（无 stemming）
- 构建后自动索引（`postbuild` 脚本）

**线索收集**
- LeadForm 组件（"use client"）
- 表单字段：姓名、微信/手机、关注科目、学习意向（4 选 1：自学/考虑报班/想了解价格/企业团报）、备注
- 提交到 Supabase leads 表
- 成功/失败/提交中三种状态
- 通过 `dynamic(() => import(...), { ssr: false })` 避免构建时 Supabase 初始化错误

**SEO**
- 所有页面 `generateMetadata` 完整实现（OpenGraph + Twitter Card + canonical URL）
- `sitemap.ts` 动态生成 sitemap
- `robots.txt` 指向 sitemap
- JSON-LD 结构化数据（BreadcrumbList）
- 移动优先响应式设计

**UI 组件库**
- Badge、Button、Card、Skeleton、ProgressBar、Accordion、Tabs（部分未使用但已实现）

### 2.2 已搭建的技术栈

| 类别 | 选型 | 备注 |
|------|------|------|
| 框架 | Next.js 14.2.35 (App Router) | `output: "export"` 静态导出 |
| 语言 | TypeScript 5.4.5 | strict mode |
| 样式 | Tailwind CSS 3.4.3 | 自定义 primary/accent 色系，Noto Sans SC 字体 |
| 内容 | MDX (next-mdx-remote/rsc 4.4.1) | 编译时渲染，内容在 `src/content/` |
| 搜索 | Pagefind 1.1.0 | postbuild 索引，零基础设施 |
| 图标 | Lucide React 0.378.0 | |
| 数据库 | Supabase (仅用于 Leads) | 浏览器直连，无需后端 API |
| 部署 | Vercel 免费层 | 静态文件托管 |
| Markdown | remark-gfm 4.0.0 | GFM 表格/任务列表支持 |

### 2.3 内容完成情况

| 章节 | 学习笔记 (page.mdx) | 测验 (quiz.json) | 状态 |
|------|---------------------|------------------|------|
| chapter-01 安全生产相关国家政策 | **已完成** (5.6KB, 含 Callout/LawArticle/KeyPoint 等) | **已完成** (10KB, 15 题) | 生产就绪 |
| chapter-02 ~ chapter-20 | **占位** (466B 空模板, 仅 frontmatter + "内容持续更新中") | **占位** (94B, `{"questions":[]}`) | 待填充 |

**聚合内容（全部为示例数据）**:
- `bisai.json`: 3 条示例 B站视频
- `compare.json`: 3 张示例对比表
- `mindmaps.json`: 3 条示例思维导图

---

## 3. 待完成任务（按优先级排序）

### 高优先级（阻塞上线）

1. **填充 chapters 2-20 的学习笔记**
   - 为每个 `src/content/laws/chapter-XX/page.mdx` 写入完整的 MDX 学习内容
   - 模板格式参考 chapter-01/page.mdx（frontmatter + 正文 + MDX 自定义组件）
   - 用户有 ~100GB 资料待消化整理

2. **填充 chapters 2-20 的测验题**
   - 为每个 `src/content/laws/chapter-XX/quiz.json` 写入 15-30 道题目
   - 题目格式参考 chapter-01/quiz.json（id, type, stem, options, answer, explanation, examPoint, difficulty）
   - type: "single" / "multi" / "judge"
   - 用户有各章节练习题资料

3. **完善聚合内容数据**
   - 扩展 `bisai.json`：每章至少 1-2 个 B站视频
   - 扩展 `compare.json`：覆盖更多易混知识点
   - 扩展 `mindmaps.json`：每章至少 1 张思维导图（目前用 ProcessOn 分享链接）

4. **Supabase 配置与测试**
   - 用户需注册 Supabase → 运行建表 SQL（已在 SETUP_GUIDE.md 中提供）→ 填入 `.env`
   - 验证线索表单提交 → 数据库写入 → 后台查看的全流程
   - 当前 `.env.example` 中 Supabase 凭据为空

5. **部署到 Vercel**
   - 创建 Vercel 账号 → 连接 GitHub → 导入项目 → 配置环境变量 → 部署
   - 购买域名并绑定（用户还未购买域名）

### 中优先级（重要但可延后）

6. **扩展其余 3 个科目**
   - 在 `src/constants.ts` 中已定义了 `management`(管理)、`technology`(技术)、`case-study`(案例分析) 3 科
   - 需为每科创建 `src/content/{subject}/` 目录（含 meta.json, chapters.json, 各章节文件夹）
   - 路由已通过 `[subject]` 动态参数完全预留，加内容即可生效

7. **添加百度统计**
   - 在 root layout 中注入百度统计脚本
   - 国内 SEO 必需

8. **提交搜索引擎收录**
   - 百度站长平台 + Google Search Console

9. **内容更新工作流优化**
   - 用户是编程小白，目前更新内容需：编辑 MDX/JSON 文件 → 重新构建部署
   - 可考虑搭建简单的 CMS 或编写自动化脚本

### 低优先级（优化/体验）

10. **章节进度可视化**
    - Sidebar 已有 done/undone 标记（基于 localStorage），但缺少整体进度百分比

11. **暗色模式**
    - 目前仅浅色主题

12. **PWA 离线支持**
    - 静态站天然适合 PWA，可添加 Service Worker 实现离线访问

13. **评论/留言功能**
    - 可接入 Giscus（基于 GitHub Discussions 的免费评论系统）

14. **RSS Feed**
    - 内容更新时自动通知订阅者

---

## 4. 已知问题 & 技术债务

### 4.1 已知问题

- **Node.js 版本兼容性**: 用户电脑 Node.js v24.15.0，Next.js 14 官方推荐 Node.js 18/20。至今构建和开发均正常，但长期可能遇到未预期的兼容性问题。
- **Pagefind 模块声明**: `src/types/` 目录为空，Pagefind 的类型声明通过 `<Script>` 标签 + `window.PagefindUI` 轮询方式绕过。如果后续要改用 import 方式，需要正确的类型声明。
- **Node.js 24 兼容性警告**: `npm install` 时可能出现警告，建议在 `package.json` 中添加 `"engines": { "node": ">=18.0.0 <25.0.0" }`。

### 4.2 技术债务

- **`getChapters` 函数**: 最初用 `require()` 在 ESM 下报错，改为 `readFileSync` + `JSON.parse`。这是正确的服务器端方法，但客户端组件绝对不能直接导入 `subjects.ts`——应通过 props 传递数据。
- **客户端/服务器边界**: 核心原则是——任何导入 `fs` 的模块都是服务器端模块，客户端组件只能通过 props 接收数据。当前架构遵守此原则：`Sidebar.tsx` 接收 chapters 作为 props，`QuizClient.tsx` 接收 quizData 作为 props。
- **LeadForm 动态导入**: 使用 `dynamic(() => import(...), { ssr: false })` 避免构建时 Supabase 初始化报错。这是正确的模式，在 `[subject]/page.tsx` 和 `[chapter]/page.tsx` 两处使用，均需保持。
- **VideoCard 占位图**: 原先调用 B站 API 获取缩略图导致构建超时，改为纯 CSS 渐变占位。如果以后需要真实缩略图，必须在客户端用 `useEffect` 懒加载。
- **chapters 2-20 的 frontmatter**: 当前占位文件的 frontmatter 使用字符串 `"★"` 而非正确的难度标记（应使用 `"basic"`），`examWeight` 应改为数字（1-3），不是一个星号字符串。模板需要修正。

### 4.3 架构警示（禁止重犯的错误）

| 错误 | 原因 | 后果 |
|------|------|------|
| 客户端组件导入 `fs` 模块 | Sidebar 间接导入了 content.ts | 构建失败：`Module not found: Can't resolve 'fs'` |
| SSG 期间调用外部 API | VideoCard 在构建时请求 B站 API | 构建超时（60s × 3 次重试） |
| 模块级 `createClient("", "")` | Supabase 在构建时未配置环境变量 | 所有页面生成报错 |
| Pagefind 模块导入 | TypeScript 无法解析 Pagefind 路径 | 编译失败 |

---

## 5. 项目关键路径

### 5.1 目录结构速览

```
safe-exam/
├── SETUP_GUIDE.md              # 用户操作指南（Supabase 注册、内容更新方法）
├── HANDOVER_TO_HERMES.md       # 本文件
├── package.json                # 依赖 + 脚本（dev/build/start/lint/postbuild）
├── next.config.mjs             # output: "export" + MDX 插件
├── tailwind.config.ts          # primary/accent 色系 + Noto Sans SC 字体
├── tsconfig.json               # strict + path alias @/*
├── mdx-components.tsx           # 全局 MDX HTML 元素样式覆盖
├── postcss.config.mjs
├── .env.example                # Supabase URL + anon key 模板
│
├── public/
│   └── robots.txt              # 允许所有爬虫，指向 sitemap
│
├── src/
│   ├── app/
│   │   ├── layout.tsx          # 根布局（Noto Sans SC 字体 + metadata）
│   │   ├── page.tsx            # 首页（SSG）
│   │   ├── globals.css         # Tailwind + .prose-cn 中文排版
│   │   ├── sitemap.ts          # 动态 sitemap 生成
│   │   ├── not-found.tsx       # 404 页面
│   │   └── (main)/             # 主路由组（共享 Header + Footer 布局）
│   │       ├── layout.tsx      # Header + Footer 包装
│   │       ├── search/page.tsx # Pagefind 搜索页
│   │       └── [subject]/
│   │           ├── layout.tsx  # Sidebar + Breadcrumb 包装
│   │           ├── page.tsx    # 科目首页（章节列表 + 快捷入口 + LeadForm）
│   │           ├── bisai/page.tsx     # B站视频索引
│   │           ├── compare/page.tsx   # 易混对比页
│   │           ├── mindmaps/page.tsx  # 思维导图页
│   │           └── [chapter]/
│   │               ├── page.tsx       # 章节 MDX 内容页
│   │               └── quiz/page.tsx  # 章节测验页
│   │
│   ├── content/                # ★ 内容目录（用户需要编辑的核心区域）
│   │   └── laws/               # 安全生产法律法规
│   │       ├── meta.json       # 科目元数据
│   │       ├── chapters.json   # 20 章列表（number, slug, title, examWeight）
│   │       ├── bisai.json      # B站视频数据
│   │       ├── compare.json    # 易混对比表数据
│   │       ├── mindmaps.json   # 思维导图数据
│   │       ├── chapter-01/     # ★ 唯一完整的内容模板
│   │       │   ├── page.mdx    # 学习笔记（5.6KB）
│   │       │   └── quiz.json   # 测验题（15 题，10KB）
│   │       └── chapter-02...20/# 占位模板（待填充）
│   │
│   ├── components/
│   │   ├── content/            # MDX 自定义组件
│   │   │   ├── index.ts        # barrel export
│   │   │   ├── Callout.tsx
│   │   │   ├── LawArticle.tsx
│   │   │   ├── KeyPoint.tsx
│   │   │   ├── ExamTip.tsx
│   │   │   ├── ComparisonTable.tsx
│   │   │   ├── VideoCard.tsx   # "use client"
│   │   │   └── MindMapEmbed.tsx # "use client"
│   │   ├── home/               # Hero, SubjectCards, FeatureList
│   │   ├── layout/             # Header, Footer, Sidebar, Breadcrumb
│   │   ├── leads/              # LeadForm.tsx ("use client")
│   │   ├── quiz/               # QuizClient, QuizQuestion, QuizProgress, QuizResult
│   │   ├── search/             # SearchBox.tsx ("use client")
│   │   └── ui/                 # Badge, Button, Card, Skeleton
│   │
│   ├── lib/
│   │   ├── types.ts            # 所有 TypeScript 类型定义
│   │   ├── constants.ts        # SITE_NAME, SUBJECTS(4科), EXAM_INFO
│   │   ├── subjects.ts         # 科目/章节数据读取（服务器端，使用 fs）
│   │   ├── content.ts          # JSON/MDX 加载工具（服务器端，使用 fs）
│   │   ├── quizzes.ts          # 测验进度 localStorage（客户端安全，无 fs 依赖）
│   │   ├── seo.ts              # buildMetadata() 辅助函数
│   │   └── supabase.ts         # Supabase 客户端 + submitLead()
│   │
│   └── types/                  # 空目录（未使用）
│
└── out/                        # 构建输出（npm run build 生成，62 个页面 + Pagefind 索引）
```

### 5.2 重要配置文件

| 文件 | 用途 |
|------|------|
| `package.json` | 依赖声明 + 脚本：`dev`/`build`/`start`/`lint`/`postbuild`(Pagefind 索引) |
| `next.config.mjs` | `output: "export"`, `images.unoptimized: true`, `pageExtensions: ["ts","tsx","mdx"]` |
| `tailwind.config.ts` | primary 蓝, accent 琥珀, Noto Sans SC, `typography({ maxWidth: "none" })` |
| `tsconfig.json` | strict, `@/*` → `./src/*`, bundler 模式 |
| `mdx-components.tsx` | 全局 MDX 元素样式（h1-h3, p, ul, ol, table, blockquote 等） |
| `.env.example` | Supabase 配置模板 |
| `SETUP_GUIDE.md` | 用户自操作指南（注册 Supabase → 建表 → 配置 env → 更新内容） |

### 5.3 命令速查

```bash
# 开发模式（热重载，端口 3000）
npm run dev

# 生产构建（生成 out/ 目录）
npm run build

# 构建后自动运行 Pagefind 索引（postbuild 脚本自动触发）
pagefind --site out --output-path out/pagefind

# 启动生产预览
npm run start

# 类型检查
npm run lint
```

---

## 6. 给 HERMES 的特别提示

### 6.1 客户端/服务器边界 — 最容易出错的地方

这是整个项目最核心的约束，违反会导致构建失败：

1. **`src/lib/content.ts` 和 `src/lib/subjects.ts` 使用 Node.js `fs` 模块**，只能在服务器组件中导入。客户端组件（`"use client"`）绝对不能直接导入这两个文件。
2. **当前正确的数据流模式**: 服务器组件（如 `page.tsx`）调用 `getChapters()` / `getQuiz()` → 将结果通过 props 传递给客户端组件 → 客户端组件渲染。
3. **LeadForm 必须用 `dynamic(() => import(...), { ssr: false })` 加载**，否则构建时 Supabase 未配置环境变量会报 `supabaseUrl is required`。
4. **`src/lib/quizzes.ts` 是客户端安全的**（只使用 localStorage），可以在客户端组件中导入。

### 6.2 内容模板格式注意事项

- **chapters 2-20 的 frontmatter 有格式错误**：`examWeight: "★"` 应该是数字 `1`/`2`/`3`，`difficulty: "basic"` 格式正确。填充内容时请以 chapter-01 的 frontmatter 为准。
- **MDX 自定义组件在 page.tsx 中通过 `components` prop 注册**（Callout, LawArticle, KeyPoint, ExamTip, ComparisonTable, VideoCard, MindMapEmbed），在 MDX 文件中直接使用。
- **测验 JSON 格式**：`type` 为 `"single"`/`"multi"`/`"judge"`，`answer` 为选项字母（如 `"B"`, `"ABC"`）或 `"T"`/`"F"`（判断题）。每题必须有 `explanation` 字段。

### 6.3 用户资料处理

- 用户是**编程小白**，无法自行处理代码。所有内容填充工作由 AI 完成。
- 用户手上有 **~100GB 学习资料**（PDF 格式的讲义、思维导图、练习题），但上传到聊天窗口多次失败。
- **建议 HERMES 优先协助用户找到可行的文件传输方式**（百度网盘分享链接、阿里云盘、分章发送、或让用户指定本地文件路径以直接读取等），然后逐章消化整理。
- 内容更新工作流已在 `SETUP_GUIDE.md` 中详细记录，面向用户是中文指南。

### 6.4 构建与部署注意事项

- **构建时间**: 当前 62 个页面约需 2-3 分钟（含 Pagefind 索引）。填充全部 20 章真实内容后预计不会显著增加——MDX 编译是主要耗时项但按页并行。
- **Node.js 版本**: 用户电脑是 Node.js v24.15.0。如果遇到奇怪的构建错误，首先怀疑 Node.js 版本兼容性，尝试降级到 Node.js 20 LTS。
- **Vercel 部署**: 用户尚未注册 Vercel / GitHub / 购买域名。部署流程在 `SETUP_GUIDE.md` 中。
- **每次内容更新后需要重新构建部署**：`npm run build` → 部署 `out/` 目录（或推送 Git → Vercel 自动部署）。

### 6.5 本地开发端口

上次开发服务器运行在 **端口 3456**（默认 3000 可能被占用）。启动时注意检查端口冲突。

### 6.6 用户偏好

- 用户明确表示"不必询问我的看法，全部同意，我只看最终结果"——即自主执行模式，不需要频繁确认。
- 但涉及外部服务注册（Supabase、Vercel、域名购买）时，需要用户亲自操作并提供凭据。
- 用户对技术细节不感兴趣，解释要极简化或省略。

### 6.7 项目无 Git 仓库

当前项目**不在 Git 版本管理中**（没有 `.git` 目录）。用户推送到 GitHub + Vercel 自动部署需要先 `git init` + 创建 GitHub 仓库。这是部署前的必要步骤。
