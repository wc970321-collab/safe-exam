"use client";

interface QuizProgressProps {
  current: number;
  total: number;
  answered: number;
}

export default function QuizProgress({
  current,
  total,
  answered,
}: QuizProgressProps) {
  const percent = Math.round((answered / total) * 100);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-500">
          第 {current} / {total} 题
        </span>
        <span className="text-sm text-gray-500">
          已答 {answered} 题 ({percent}%)
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
