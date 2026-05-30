"use client";

import { useState, useEffect, useCallback } from "react";
import { CheckCircle2, XCircle, RefreshCw, ArrowRight } from "lucide-react";

type Question = {
  id: string;
  type: "single" | "multiple" | "judge";
  stem: string;
  options?: { key: string; text: string }[];
  answer: string;
  explanation: string;
  examPoint?: string;
  difficulty?: string;
  chapterNumber?: number;
  chapterTitle?: string;
};

interface DailyQuizProps {
  initialQuestions: Question[];
}

export default function DailyQuiz({ initialQuestions }: DailyQuizProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const pickRandom = useCallback(() => {
    const shuffled = [...initialQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
  }, [initialQuestions]);

  useEffect(() => {
    setQuestions(pickRandom());
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  }, [pickRandom]);

  const handleSingleSelect = (qId: string, key: string) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qId]: [key] }));
  };

  const handleMultipleSelect = (qId: string, key: string) => {
    if (submitted) return;
    setAnswers((prev) => {
      const cur = prev[qId] || [];
      if (cur.includes(key)) {
        return { ...prev, [qId]: cur.filter((k) => k !== key) };
      }
      return { ...prev, [qId]: [...cur, key] };
    });
  };

  const handleJudgeSelect = (qId: string, value: string) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qId]: [value] }));
  };

  const handleSubmit = () => {
    let correct = 0;
    for (const q of questions) {
      const userAns = answers[q.id];
      if (!userAns || userAns.length === 0) continue;

      if (q.type === "multiple") {
        const correctAnswers = q.answer.split("").sort().join("");
        const userSorted = [...userAns].sort().join("");
        if (userSorted === correctAnswers) correct++;
      } else {
        if (userAns[0] === q.answer) correct++;
      }
    }
    setScore(correct);
    setSubmitted(true);
  };

  const handleReset = () => {
    setQuestions(pickRandom());
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  const isAnswerCorrect = (q: Question) => {
    const userAns = answers[q.id];
    if (!userAns || userAns.length === 0) return false;
    if (q.type === "multiple") {
      return [...userAns].sort().join("") === q.answer.split("").sort().join("");
    }
    return userAns[0] === q.answer;
  };

  const getAnswerStatus = (q: Question, key: string) => {
    if (!submitted) return "";
    const isCorrectOption = q.answer.includes(key);
    const isSelected = answers[q.id]?.includes(key);

    if (isCorrectOption && isSelected) return "correct";
    if (isCorrectOption && !isSelected) return "missed";
    if (!isCorrectOption && isSelected) return "wrong";
    return "";
  };

  const allAnswered = questions.every(
    (q) => answers[q.id] && answers[q.id].length > 0
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-gray-800">每日一练</h3>
            <p className="text-xs text-gray-400 mt-0.5">
              随机5题，保持手感
            </p>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            换一批
          </button>
        </div>
      </div>

      {/* Questions */}
      <div className="px-5 py-3 space-y-4">
        {questions.length === 0 && (
          <div className="text-center py-8 text-sm text-gray-400">
            题库暂未加载，请刷新页面重试
          </div>
        )}

        {questions.map((q, idx) => (
          <div
            key={q.id}
            className={`rounded-xl border p-4 transition-all ${
              submitted
                ? isAnswerCorrect(q)
                  ? "border-green-200 bg-green-50/30"
                  : "border-red-200 bg-red-50/30"
                : "border-gray-100 hover:border-primary-100"
            }`}
          >
            {/* Stem */}
            <div className="flex items-start gap-2 mb-3">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary-50 text-primary-600 text-xs font-semibold shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 leading-relaxed">
                  {q.stem}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[11px] text-gray-400">
                    {q.type === "single"
                      ? "单选题"
                      : q.type === "multiple"
                        ? "多选题"
                        : "判断题"}
                  </span>
                  {q.chapterTitle && (
                    <span className="text-[11px] text-gray-400">
                      · {q.chapterTitle}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-1.5 pl-7">
              {q.type === "judge" ? (
                <div className="flex gap-3">
                  {["T", "F"].map((val) => {
                    const status = getAnswerStatus(q, val);
                    const selected = answers[q.id]?.[0] === val;
                    return (
                      <button
                        key={val}
                        onClick={() => handleJudgeSelect(q.id, val)}
                        disabled={submitted}
                        className={`px-5 py-2 rounded-lg text-sm font-medium border transition-all ${
                          submitted
                            ? status === "correct"
                              ? "bg-green-100 border-green-300 text-green-700"
                              : status === "wrong"
                                ? "bg-red-100 border-red-300 text-red-700"
                                : status === "missed"
                                  ? "bg-orange-50 border-orange-200 text-orange-600"
                                  : "bg-gray-50 border-gray-200 text-gray-400"
                            : selected
                              ? "bg-primary-50 border-primary-300 text-primary-700"
                              : "bg-white border-gray-200 text-gray-600 hover:border-primary-200 hover:text-primary-600"
                        }`}
                      >
                        {val === "T" ? "正确" : "错误"}
                      </button>
                    );
                  })}
                </div>
              ) : (
                q.options?.map((opt) => {
                  const status = getAnswerStatus(q, opt.key);
                  const selected = answers[q.id]?.includes(opt.key);
                  return (
                    <button
                      key={opt.key}
                      onClick={() =>
                        q.type === "single"
                          ? handleSingleSelect(q.id, opt.key)
                          : handleMultipleSelect(q.id, opt.key)
                      }
                      disabled={submitted}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm border transition-all flex items-center gap-2 ${
                        submitted
                          ? status === "correct"
                            ? "bg-green-100 border-green-300 text-green-700"
                            : status === "wrong"
                              ? "bg-red-100 border-red-300 text-red-700"
                              : status === "missed"
                                ? "bg-orange-50 border-orange-200 text-orange-600"
                                : "bg-gray-50 border-gray-200 text-gray-400"
                          : selected
                            ? "bg-primary-50 border-primary-300 text-primary-700"
                            : "bg-white border-gray-200 text-gray-600 hover:border-primary-200 hover:text-primary-600"
                      }`}
                    >
                      <span
                        className={`w-5 h-5 shrink-0 flex items-center justify-center text-xs font-semibold rounded ${
                          submitted
                            ? status === "correct"
                              ? "bg-green-200 text-green-800"
                              : status === "wrong"
                                ? "bg-red-200 text-red-800"
                                : status === "missed"
                                  ? "bg-orange-100 text-orange-700"
                                  : "bg-gray-200 text-gray-500"
                            : selected
                              ? "bg-primary-200 text-primary-800"
                              : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {opt.key}
                      </span>
                      <span className="flex-1">{opt.text}</span>
                      {submitted && status === "correct" && (
                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                      )}
                      {submitted && status === "wrong" && (
                        <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                      )}
                    </button>
                  );
                })
              )}
            </div>

            {/* Explanation */}
            {submitted && (
              <div className="mt-3 pl-7">
                <div
                  className={`rounded-lg p-3 text-xs leading-relaxed ${
                    isAnswerCorrect(q)
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  <span className="font-semibold">
                    {isAnswerCorrect(q) ? "✅ 回答正确" : "❌ 回答错误"}
                  </span>
                  {isAnswerCorrect(q) ? " · " : " · "}
                  <span>{q.explanation}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Submit / Result */}
      <div className="px-5 py-4 border-t border-gray-50">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className={`w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
              allAnswered
                ? "bg-primary-500 text-white hover:bg-primary-600 shadow-sm"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            交卷批改
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-2">
              <span className="text-sm text-gray-500">正确率</span>
              <span
                className={`text-2xl font-bold ${
                  score >= 4
                    ? "text-green-600"
                    : score >= 3
                      ? "text-yellow-600"
                      : "text-red-600"
                }`}
              >
                {score}/{questions.length}
              </span>
            </div>
            <p className="text-xs text-gray-400 mb-3">
              {score === 5
                ? "满分！你今天状态极佳！🎉"
                : score >= 4
                  ? "发挥不错，继续保持！👍"
                  : score >= 3
                    ? "基本合格，再巩固一下薄弱点吧"
                    : "错误较多，建议回顾对应章节错题"}
            </p>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              换一批练习
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
