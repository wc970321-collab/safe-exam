import { SITE_STATS } from "@/lib/constants";
import { BookOpen, BrainCircuit, GitCompare, Files } from "lucide-react";

const stats = [
  {
    value: SITE_STATS.chaptersCompleted,
    suffix: "章",
    label: "已上线章节",
    icon: BookOpen,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    value: SITE_STATS.questionsTotal,
    suffix: "+道",
    label: "配套习题",
    icon: Files,
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-50",
    iconColor: "text-indigo-600",
  },
  {
    value: SITE_STATS.mindmapsTotal,
    suffix: "张",
    label: "思维导图",
    icon: BrainCircuit,
    color: "from-cyan-500 to-cyan-600",
    bgColor: "bg-cyan-50",
    iconColor: "text-cyan-600",
  },
  {
    value: SITE_STATS.compareTables,
    suffix: "张",
    label: "对比表格",
    icon: GitCompare,
    color: "from-sky-500 to-sky-600",
    bgColor: "bg-sky-50",
    iconColor: "text-sky-600",
  },
];

export default function StatsBar() {
  return (
    <section className="py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className={`${s.bgColor} rounded-2xl p-4 sm:p-5 text-center border border-white/60 hover:shadow-sm transition-shadow`}
              >
                <div
                  className={`w-9 h-9 mx-auto mb-2 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center`}
                >
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-gray-800">
                  {s.value}
                  <span className="text-base sm:text-lg font-semibold text-primary-500">
                    {s.suffix}
                  </span>
                </div>
                <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
