import Link from "next/link";

const actions = [
  {
    href: "/laws",
    icon: "📖",
    label: "系统学习",
    desc: "逐章精讲，考点全覆盖",
    bgColor: "bg-blue-50",
    iconBg: "bg-blue-100",
    borderHover: "hover:border-blue-200",
  },
  {
    href: "/laws/chapter-01/quiz",
    icon: "✍️",
    label: "章节练习",
    desc: "每章配套练习+详细解析",
    bgColor: "bg-indigo-50",
    iconBg: "bg-indigo-100",
    borderHover: "hover:border-indigo-200",
  },
  {
    href: "/laws/compare",
    icon: "🔄",
    label: "对比记忆",
    desc: "易混知识点精准区分",
    bgColor: "bg-cyan-50",
    iconBg: "bg-cyan-100",
    borderHover: "hover:border-cyan-200",
  },
  {
    href: "/laws/mindmaps",
    icon: "🧠",
    label: "思维导图",
    desc: "知识体系一目了然",
    bgColor: "bg-sky-50",
    iconBg: "bg-sky-100",
    borderHover: "hover:border-sky-200",
  },
  {
    href: "/laws/chapter-01",
    icon: "⭐",
    label: "高频考点",
    desc: "直击核心，高效拿分",
    bgColor: "bg-amber-50",
    iconBg: "bg-amber-100",
    borderHover: "hover:border-amber-200",
  },
  {
    href: "/laws/bisai",
    icon: "🎬",
    label: "免费课程",
    desc: "精选B站优质课程导航",
    bgColor: "bg-rose-50",
    iconBg: "bg-rose-100",
    borderHover: "hover:border-rose-200",
  },
  {
    href: "/hotspots",
    icon: "📋",
    label: "高频考点",
    desc: "Top40核心考点直击",
    bgColor: "bg-violet-50",
    iconBg: "bg-violet-100",
    borderHover: "hover:border-violet-200",
  },
  {
    href: "/guide",
    icon: "📚",
    label: "备考指南",
    desc: "从零到通关全攻略",
    bgColor: "bg-teal-50",
    iconBg: "bg-teal-100",
    borderHover: "hover:border-teal-200",
  },
];

export default function QuickActions() {
  return (
    <section className="py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            快速备考入口
          </h2>
          <p className="text-sm text-gray-400 max-w-md mx-auto">
            从零到通关，一站式搞定
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {actions.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className={`${a.bgColor} rounded-2xl p-4 sm:p-5 border border-transparent ${a.borderHover} transition-all hover:shadow-sm active:scale-[0.98] group`}
            >
              <div
                className={`w-10 h-10 ${a.iconBg} rounded-xl flex items-center justify-center text-lg mb-3 group-hover:scale-110 transition-transform`}
              >
                {a.icon}
              </div>
              <h3 className="font-semibold text-gray-800 text-sm mb-1">
                {a.label}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">{a.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
