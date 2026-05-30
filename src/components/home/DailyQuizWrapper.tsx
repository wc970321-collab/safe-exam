import { promises as fs } from "fs";
import path from "path";
import DailyQuiz from "./DailyQuiz";

async function loadAllQuizQuestions() {
  const contentDir = path.join(process.cwd(), "src/content/laws");
  const chapters = [1, 2, 3, 4, 5, 6, 7];
  const allQuestions: any[] = [];

  for (const ch of chapters) {
    const chapterSlug = `chapter-${String(ch).padStart(2, "0")}`;
    const quizPath = path.join(contentDir, chapterSlug, "quiz.json");

    try {
      const raw = await fs.readFile(quizPath, "utf-8");
      const data = JSON.parse(raw);
      const questions = data.questions || [];
      allQuestions.push(
        ...questions.map((q: any) => ({
          ...q,
          chapterNumber: ch,
          chapterTitle: data.title || `第${ch}章`,
        }))
      );
    } catch {
      // skip if quiz.json doesn't exist or is unreadable
    }
  }

  return allQuestions;
}

export default async function DailyQuizWrapper() {
  const allQuestions = await loadAllQuizQuestions();
  return <DailyQuiz initialQuestions={allQuestions} />;
}
