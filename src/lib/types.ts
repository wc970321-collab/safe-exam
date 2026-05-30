// 科目元数据
export interface SubjectMeta {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  order: number;
  totalChapters: number;
  color: string;
}

// 章节元数据
export interface ChapterMeta {
  number: number;
  slug: string;
  title: string;
  examWeight: number; // 1-3
}

// MDX Frontmatter
export interface ChapterFrontmatter {
  title: string;
  chapter: number;
  subject: string;
  description: string;
  keywords: string[];
  order: number;
  lastUpdated: string;
  difficulty: "basic" | "intermediate" | "advanced";
  examWeight: string; // "★" | "★★" | "★★★"
  estimatedMinutes: number;
}

// 测验
export interface QuizOption {
  key: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  type: "single" | "multi" | "judge";
  stem: string;
  options: QuizOption[];
  answer: string;
  explanation: string;
  examPoint: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface ChapterQuiz {
  chapterNumber: number;
  title: string;
  passingScore: number;
  questions: QuizQuestion[];
}

// 视频
export interface VideoEntry {
  bvid: string;
  title: string;
  author: string;
  chapterNumber: number;
  tags: string[];
  duration: string;
}

// 对比表
export interface ComparisonRow {
  id: string;
  title: string;
  chapterNumbers: number[];
  columns: string[];
  rows: string[][];
  keyTakeaway: string;
}

// 思维导图
export interface MindMapEntry {
  id: string;
  title: string;
  chapterNumber: number;
  src?: string;
  description: string;
  /** 思维导图结构化节点 */
  nodes?: MindMapNode[];
  /** 或文字概要 */
  summary?: string;
}

export interface MindMapNode {
  label: string;
  children?: MindMapNode[];
}

// 视频课程
export interface VideoEntry {
  id: string;
  chapterNumber: number;
  chapterTitle: string;
  title: string;
  description: string;
  source: string;
  url: string;
  duration: string;
}

// 用户测验进度 (localStorage)
export interface QuizProgress {
  [quizKey: string]: {
    completed: boolean;
    score: number;
    total: number;
    date: string;
  };
}
