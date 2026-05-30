"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Scale, ClipboardList, Wrench, FileText } from "lucide-react";

const slides = [
  {
    icon: Scale,
    title: "安全生产法律法规",
    chapters: 7,
    examWeight: "30%",
    desc: "法条体系完整梳理 · 历年真题高频考点全覆盖 · 每章配套练习即时检验",
    gradient: "from-blue-500 to-indigo-600",
    label: "已上线",
  },
  {
    icon: ClipboardList,
    title: "安全生产管理",
    chapters: 12,
    examWeight: "30%",
    desc: "安全管理体系与方法 · 风险评估与控制 · 应急管理与事故调查",
    gradient: "from-sky-500 to-blue-600",
    label: "即将上线",
  },
  {
    icon: Wrench,
    title: "安全生产技术基础",
    chapters: 6,
    examWeight: "20%",
    desc: "机械电气安全 · 防火防爆 · 特种设备 · 危险化学品",
    gradient: "from-cyan-500 to-blue-600",
    label: "即将上线",
  },
  {
    icon: FileText,
    title: "安全生产专业实务",
    chapters: 7,
    examWeight: "20%",
    desc: "案例分析 · 事故预防与应急处置 · 专业能力综合考查",
    gradient: "from-indigo-500 to-blue-700",
    label: "即将上线",
  },
];

export default function SubjectCarousel() {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (!autoplay) return;
    const t = setInterval(next, 4000);
    return () => clearInterval(t);
  }, [autoplay, next]);

  const slide = slides[current];

  return (
    <section className="py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            四大考试科目
          </h2>
          <p className="text-sm text-gray-400 max-w-md mx-auto">
            系统备考，逐个击破
          </p>
        </div>

        {/* 轮播主体 */}
        <div className="relative max-w-3xl mx-auto">
          {/* 卡片 */}
          <div className="relative overflow-hidden rounded-2xl bg-white border border-warm-100/70 shadow-sm">
            <div className={`relative p-6 sm:p-8 bg-gradient-to-br ${slide.gradient} text-white`}>
              {/* 内容 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center flex-shrink-0">
                  <slide.icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold">{slide.title}</h3>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/20 backdrop-blur font-medium">
                      {slide.label}
                    </span>
                  </div>
                  <p className="text-sm text-white/80 leading-relaxed mb-4">
                    {slide.desc}
                  </p>
                  <div className="flex gap-4 text-xs text-white/60">
                    <span>{slide.chapters} 个章节</span>
                    <span>考试占比约 {slide.examWeight}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 底部指示条 */}
            <div className="px-6 sm:px-8 py-3 flex items-center justify-between">
              <div className="flex gap-1.5">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setCurrent(i); setAutoplay(false); }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === current
                        ? "bg-primary-500 w-5"
                        : "bg-warm-300 hover:bg-warm-400"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-1">
                <button
                  onClick={prev}
                  className="w-7 h-7 rounded-lg bg-warm-50 flex items-center justify-center hover:bg-warm-100 transition-colors"
                  aria-label="上一个"
                >
                  <ChevronLeft className="w-3.5 h-3.5 text-gray-500" />
                </button>
                <button
                  onClick={next}
                  className="w-7 h-7 rounded-lg bg-warm-50 flex items-center justify-center hover:bg-warm-100 transition-colors"
                  aria-label="下一个"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
