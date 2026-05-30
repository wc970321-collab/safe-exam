import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { cache } from "react";
import type { ChapterQuiz } from "./types";

export function loadJsonContent<T>(
  subject: string,
  file: string
): T | null {
  try {
    const path = join(process.cwd(), "src", "content", subject, file);
    if (!existsSync(path)) return null;
    return JSON.parse(readFileSync(path, "utf-8")) as T;
  } catch {
    return null;
  }
}

export function getQuiz(
  subject: string,
  chapter: string
): ChapterQuiz | null {
  return loadJsonContent<ChapterQuiz>(subject, `${chapter}/quiz.json`);
}
