"use client";

import { useState, useEffect } from "react";
import { EXAM_INFO } from "@/lib/constants";

export default function ExamCountdown() {
  const calcRemaining = () => {
    const now = new Date();
    const examDate = new Date(
      EXAM_INFO.examYear,
      EXAM_INFO.examMonth - 1,
      EXAM_INFO.examDay
    );
    const diff = examDate.getTime() - now.getTime();

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds, expired: false };
  };

  const [time, setTime] = useState(calcRemaining);

  useEffect(() => {
    const t = setInterval(() => {
      setTime(calcRemaining());
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100/60 p-6 sm:p-8 text-center">
          {/* 标题 */}
          <div className="text-xs sm:text-sm text-primary-500 font-medium mb-4 tracking-wider">
            距考试还有
          </div>

          {/* 倒计时数字 */}
          <div className="flex items-center justify-center gap-3 sm:gap-5 mb-3">
            {time.expired ? (
              <span className="text-2xl sm:text-3xl font-bold text-primary-600">
                考试已开始
              </span>
            ) : (
              <>
                <TimeBlock value={time.days} label="天" />
                <span className="text-2xl sm:text-3xl font-bold text-primary-300 mt-[-1.5rem]">
                  :
                </span>
                <TimeBlock value={time.hours} label="时" />
                <span className="text-2xl sm:text-3xl font-bold text-primary-300 mt-[-1.5rem]">
                  :
                </span>
                <TimeBlock value={time.minutes} label="分" />
                <span className="text-2xl sm:text-3xl font-bold text-primary-300 mt-[-1.5rem]">
                  :
                </span>
                <TimeBlock value={time.seconds} label="秒" />
              </>
            )}
          </div>

          {/* 考试名称 */}
          <div className="text-xs sm:text-sm text-gray-400">
            {EXAM_INFO.examYear}年{EXAM_INFO.name}考试 · {EXAM_INFO.examMonth}月{EXAM_INFO.examDay}日
          </div>
        </div>
      </div>
    </section>
  );
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl sm:text-3xl font-bold text-primary-600 tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[10px] sm:text-xs text-gray-400 mt-0.5">
        {label}
      </span>
    </div>
  );
}
