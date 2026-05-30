import type { ChapterQuiz, QuizProgress } from "./types";

export function getQuizKey(subject: string, chapter: string): string {
  return `${subject}/${chapter}`;
}

export function getProgress(): QuizProgress {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem("safe-exam-progress") || "{}");
  } catch {
    return {};
  }
}

export function saveProgress(
  subject: string,
  chapter: string,
  score: number,
  total: number
): void {
  if (typeof window === "undefined") return;
  const key = getQuizKey(subject, chapter);
  const progress = getProgress();
  progress[key] = {
    completed: true,
    score,
    total,
    date: new Date().toISOString(),
  };
  localStorage.setItem("safe-exam-progress", JSON.stringify(progress));
}
