# 网站配置指南（小白友好版）

## 一、Supabase 注册与线索收集配置（30 分钟）

网站已内置"免费领取资料"表单，读者填写后数据自动存入你的 Supabase 数据库。

### 1.1 注册 Supabase

1. 打开 https://supabase.com ，点击右上角绿色按钮 **"Start your project"**
2. 用 GitHub 账号登录（没有的话先注册一个 GitHub 账号）
3. 点击 **"New project"** 创建新项目
4. 填写信息：
   - Name: `safe-exam`（随便填）
   - Database Password: 设置一个密码（保存好！）
   - Region: 选择 **Northeast Asia (Tokyo)** 离中国最近
   - Pricing Plan: 选择 **Free**（免费版足够用）
5. 点击 **"Create project"**，等 2 分钟项目创建完成

### 1.2 创建数据表

1. 进入你的 Supabase 项目后台，点击左侧菜单 **"SQL Editor"**
2. 点击 **"New query"**
3. 把以下内容**全部复制粘贴**进去：

```sql
-- 创建 leads 表（线索收集）
CREATE TABLE leads (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    contact TEXT NOT NULL,
    subject TEXT DEFAULT 'laws',
    intent TEXT DEFAULT 'self_study',
    note TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 开启行级安全（允许网站提交）
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "允许匿名提交" ON leads
    FOR INSERT TO anon
    WITH CHECK (true);

CREATE POLICY "登录用户可查看" ON leads
    FOR SELECT TO authenticated
    USING (true);
```

4. 点击右下角 **"Run"** 按钮执行
5. 你应该看到绿色的 "Success" 提示

### 1.3 获取连接凭据

1. 点击左侧菜单 **"Settings"** → **"API"**
2. 你会看到两个关键信息：
   - **Project URL**: 类似 `https://xxxxx.supabase.co`
   - **anon public key**: 一串很长的字符串
3. 把这两个值填到站点的 `.env` 文件中（见下方）

### 1.4 配置网站

在项目根目录找到 `.env.example`，把它复制一份，重命名为 `.env`，然后填入你刚才获取的值：

```
NEXT_PUBLIC_SUPABASE_URL=https://你的项目ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的anon-key
```

配置完成后重新部署网站，线索收集功能即可生效。

### 1.5 查看线索

- 进入 Supabase 后台 → 左侧菜单 **"Table Editor"** → 点击 **"leads"** 表
- 所有提交的线索会实时显示在这里
- 可以导出为 CSV/Excel

---

## 二、内容更新指南

网站内容存放在 `src/content/laws/` 目录下，每个章节是一个文件夹。

### 2.1 更新章节学习笔记

打开 `src/content/laws/chapter-01/page.mdx`（以第 1 章为例），你会看到：

```markdown
---
title: "第一章 安全生产相关国家政策"
chapter: 1
description: "章节描述..."
keywords: ["关键词1", "关键词2"]
difficulty: "basic"
examWeight: "★★"
estimatedMinutes: 25
---

## 一、安全生产方针

正文内容...
```

- `---` 之间的部分是配置信息（标题、难度、星级等）
- `---` 之后的是正文，使用 Markdown 格式
- 复制 chapter-01 的格式，修改内容即可创建新章节

### 2.2 更新测验题

打开 `src/content/laws/chapter-01/quiz.json`，按以下格式添加题目：

```json
{
    "id": "laws-01-016",
    "type": "single",
    "stem": "题目内容",
    "options": [
        { "key": "A", "text": "选项A" },
        { "key": "B", "text": "选项B" },
        { "key": "C", "text": "选项C" },
        { "key": "D", "text": "选项D" }
    ],
    "answer": "B",
    "explanation": "答案解析",
    "examPoint": "考点名称",
    "difficulty": "easy"
}
```

- `type`: "single" = 单选, "multi" = 多选, "judge" = 判断
- `answer`: 单选填 "B"，多选填 "ABC"，判断填 "T" 或 "F"
- `difficulty`: "easy" / "medium" / "hard"

### 2.3 更新B站视频列表

打开 `src/content/laws/bisai.json`，按格式添加：

```json
{
    "bvid": "BV1xx411x7xx",
    "title": "视频标题",
    "author": "UP主名称",
    "chapterNumber": 3,
    "tags": ["标签1", "标签2"],
    "duration": "45:20"
}
```

### 2.4 更新思维导图

打开 `src/content/laws/mindmaps.json`，按格式添加：

```json
{
    "id": "mm-04",
    "title": "导图标题",
    "chapterNumber": 5,
    "src": "https://www.processon.com/view/link/你的分享链接",
    "description": "导图描述"
}
```

### 2.5 更新易混对比表

打开 `src/content/laws/compare.json`，按格式添加：

```json
{
    "id": "compare-04",
    "title": "对比表标题",
    "chapterNumbers": [3, 5],
    "columns": ["维度", "A项", "B项"],
    "rows": [
        ["第一行", "A值", "B值"],
        ["第二行", "A值", "B值"]
    ],
    "keyTakeaway": "记忆要点总结"
}
```

---

## 三、内容更新后如何部署

### 如果你用的是 Vercel：
1. 把更新的文件推送到 GitHub
2. Vercel 自动检测并重新构建部署（约 2-3 分钟）

### 如果你不熟悉 Git：
1. 把写好的内容文件发给我（或会操作的人）
2. 帮你在电脑上重新运行 `npm run build`
3. 把 `out/` 文件夹内容上传到你的服务器/Vercel

---

## 四、快速参考卡片

| 我想做什么 | 去哪里操作 |
|-----------|-----------|
| 写一章新的学习笔记 | `src/content/laws/chapter-XX/page.mdx` |
| 添加测验题 | `src/content/laws/chapter-XX/quiz.json` |
| 添加B站视频 | `src/content/laws/bisai.json` |
| 添加思维导图 | `src/content/laws/mindmaps.json` |
| 添加易混对比表 | `src/content/laws/compare.json` |
| 查看线索数据 | Supabase 后台 → Table Editor → leads |
| 修改网站样式/功能 | 需要我帮你修改代码 |

---

## 五、需要我帮忙的时候

直接把整理好的学习材料（Word/PDF/TXT/网页链接）发给我，告诉我是第几章的内容，我可以帮你：
- 转成页面所需的 MDX 格式
- 提取重要考点做成测验题
- 整理成对比表或思维导图数据
