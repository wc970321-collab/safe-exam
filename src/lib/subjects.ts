import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { cache } from "react";
import { SUBJECTS } from "./constants";
import type { ChapterMeta, SubjectMeta } from "./types";

export function getAllSubjects(): SubjectMeta[] {
  return SUBJECTS;
}

export function getSubject(slug: string): SubjectMeta | undefined {
  return SUBJECTS.find((s) => s.slug === slug);
}

export const getChapters = cache(
  (subjectSlug: string): ChapterMeta[] => {
    try {
      const path = join(
        process.cwd(),
        "src",
        "content",
        subjectSlug,
        "chapters.json"
      );
      if (!existsSync(path)) return [];
      return JSON.parse(readFileSync(path, "utf-8"));
    } catch {
      return [];
    }
  }
);

export function getChapter(
  subjectSlug: string,
  chapterSlug: string
): ChapterMeta | undefined {
  const chapters = getChapters(subjectSlug);
  return chapters.find((c) => c.slug === chapterSlug);
}

export function getAdjacentChapters(
  subjectSlug: string,
  chapterSlug: string
): { prev: ChapterMeta | null; next: ChapterMeta | null } {
  const chapters = getChapters(subjectSlug);
  const index = chapters.findIndex((c) => c.slug === chapterSlug);
  return {
    prev: index > 0 ? chapters[index - 1] : null,
    next: index < chapters.length - 1 ? chapters[index + 1] : null,
  };
}
