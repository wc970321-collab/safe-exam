"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/lib/types";
import QuizQuestionCard from "./QuizQuestion";

interface QuizResultProps {
  score: number;
  total: number;
  passed: boolean;
  questions: QuizQuestion[];
  answers: Record<string, string>;
  onRetry: () => void;
}

export default function QuizResult({
  score,
  total,
  passed,
  questions,
  answers,
  onRetry,
}: QuizResultProps) {
  const [reviewMode, setReviewMode] = useState(false);

  if (reviewMode) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">答题回顾</h3>
          <button
            onClick={() => setReviewMode(false)}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            返回成绩单
          </button>
        </div>
        {questions.map((q) => (
          <QuizQuestionCard
            key={q.id}
            question={q}
            selectedAnswer={answers[q.id] || ""}
            onAnswer={() => {}}
            showResult={true}
          />
        ))}
      </div>
    );
  }

  const percent = Math.round((score / total) * 100);
  const wrongCount = total - score;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
      {/* 分数圆圈 */}
      <div
        className={`w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-6 border-4 ${
          passed
            ? "border-green-400 bg-green-50"
            : "border-red-300 bg-red-50"
        }`}
      >
        <div>
          <div
            className={`text-3xl font-bold ${
              passed ? "text-green-600" : "text-red-500"
            }`}
          >
            {percent}
          </div>
          <div className="text-xs text-gray-500">正确率</div>
        </div>
      </div>

      <h2
        className={`text-xl font-bold mb-2 ${
          passed ? "text-green-700" : "text-red-600"
        }`}
      >
        {passed ? "恭喜通过!" : "未通过，继续加油!"}
      </h2>
      <p className="text-gray-500 text-sm mb-6">
        {score}/{total} 题正确
        {!passed && `（还需答对 ${Math.ceil(total * 0.6) - score} 题才能通过）`}
      </p>

      {/* 统计 */}
      <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto mb-6">
        <div className="bg-green-50 rounded-lg p-3">
          <div className="text-lg font-bold text-green-600">{score}</div>
          <div className="text-xs text-green-500">正确</div>
        </div>
        <div className="bg-red-50 rounded-lg p-3">
          <div className="text-lg font-bold text-red-500">{wrongCount}</div>
          <div className="text-xs text-red-500">错误</div>
        </div>
        <div className="bg-gray-100 rounded-lg p-3">
          <div className="text-lg font-bold text-gray-600">{total}</div>
          <div className="text-xs text-gray-500">总计</div>
        </div>
      </div>

      {/* 按钮 */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={onRetry}
          className="px-5 py-2.5 text-sm font-medium bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          重新练习
        </button>
        <button
          onClick={() => setReviewMode(true)}
          className="px-5 py-2.5 text-sm font-medium border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          查看解析
        </button>
      </div>
    </div>
  );
}
