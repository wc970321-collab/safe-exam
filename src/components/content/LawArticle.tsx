import type { ReactNode } from "react";
import { BookOpen } from "lucide-react";

interface LawArticleProps {
  law: string;
  article: string;
  children: ReactNode;
}

export default function LawArticle({ law, article, children }: LawArticleProps) {
  return (
    <blockquote className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg px-5 py-4 mb-4">
      <div className="flex items-center gap-2 mb-2">
        <BookOpen className="w-4 h-4 text-amber-600" />
        <span className="text-xs font-semibold text-amber-700 bg-amber-200 px-2 py-0.5 rounded">
          {law}
        </span>
        <span className="text-xs text-amber-600">第{article}条</span>
      </div>
      <p className="text-gray-800 leading-relaxed m-0">{children}</p>
    </blockquote>
  );
}
