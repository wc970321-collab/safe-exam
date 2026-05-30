import { loadJsonContent } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import Badge from "@/components/ui/Badge";

interface Hotspot {
  id: string;
  rank: number;
  title: string;
  chapterNumber: number;
  summary: string;
  frequency: string;
}

export const metadata = buildMetadata({
  title: "高频考点 Top40",
  description: "注册安全工程师法律法规高频考点Top40，每年必考、高频、中频考点全覆盖，高效备考直击核心。",
  keywords: ["注册安全工程师", "高频考点", "法律法规", "Top40", "备考"],
  path: "/hotspots",
});

const frequencyConfig: Record<string, { label: string; variant: "danger" | "primary" | "default" }> = {
  "每年必考": { label: "每年必考", variant: "danger" },
  "高频": { label: "高频", variant: "primary" },
  "中频": { label: "中频", variant: "default" },
};

export default function HotspotsPage() {
  const hotspots = loadJsonContent<Hotspot[]>("laws", "hotspots.json") ?? [];

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* 面包屑 */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-primary-600 transition-colors">
            首页
          </Link>
          <span>/</span>
          <span className="text-gray-600">高频考点</span>
        </nav>

        {/* 标题 */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            高频考点 Top40
          </h1>
          <p className="text-sm text-gray-400">
            基于历年真题统计，覆盖法律法规科目最常考的40个知识点
          </p>
        </div>

        {/* 考点卡片网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {hotspots.map((item) => {
            const config = frequencyConfig[item.frequency] ?? { label: item.frequency, variant: "default" };
            return (
              <div
                key={item.id}
                className="group bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md hover:border-gray-200 transition-all duration-200 cursor-default"
              >
                {/* 序号 + 频次标签 */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-gray-300 bg-gray-50 rounded-md px-2 py-0.5">
                    #{item.rank}
                  </span>
                  <Badge variant={config.variant}>{config.label}</Badge>
                </div>

                {/* 标题 */}
                <h3 className="font-semibold text-gray-800 text-sm leading-snug mb-2 group-hover:text-primary-600 transition-colors">
                  {item.title}
                </h3>

                {/* 摘要 */}
                <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                  {item.summary}
                </p>

                {/* 章信息 */}
                <div className="mt-3 pt-3 border-t border-gray-50">
                  <span className="text-[11px] text-gray-300">
                    第 {item.chapterNumber} 章
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
