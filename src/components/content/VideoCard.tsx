"use client";

import { Play, Clock, ExternalLink } from "lucide-react";
import Badge from "../ui/Badge";

interface VideoCardProps {
  id: string;
  title: string;
  source: string;
  duration: string;
  url: string;
  description?: string;
  chapterNumber?: number;
}

// 来源对应显示
const sourceInfo: Record<string, { label: string; color: string; bg: string }> = {
  "B站": { label: "B站", color: "text-pink-600", bg: "bg-pink-50" },
  "中国大学MOOC": { label: "中国大学MOOC", color: "text-blue-600", bg: "bg-blue-50" },
  "学堂在线": { label: "学堂在线", color: "text-cyan-600", bg: "bg-cyan-50" },
  "网易公开课": { label: "网易公开课", color: "text-red-600", bg: "bg-red-50" },
};

// 默认来源显示
const defaultSource = { label: "公开课", color: "text-gray-600", bg: "bg-gray-50" };

const sourceGradients: Record<string, string> = {
  "B站": "from-pink-100 via-blue-100 to-purple-100",
  "中国大学MOOC": "from-blue-100 via-sky-100 to-cyan-100",
  "学堂在线": "from-cyan-100 via-teal-100 to-emerald-100",
  "网易公开课": "from-red-100 via-orange-100 to-amber-100",
};

const defaultGradient = "from-primary-100 via-blue-100 to-indigo-100";

export default function VideoCard({ title, source, duration, url, description }: VideoCardProps) {
  const info = sourceInfo[source] || defaultSource;
  const gradient = sourceGradients[source] || defaultGradient;

  return (
    <a
      href={url || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white rounded-2xl border border-warm-100/70 overflow-hidden hover:shadow-md hover:border-primary-100/60 transition-all"
    >
      {/* 缩略图 */}
      <div className={`relative aspect-video bg-gradient-to-br ${gradient} overflow-hidden`}>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Play className="w-10 h-10 text-primary-400 mb-1 group-hover:scale-110 transition-transform" />
        </div>
        {/* 来源标签 */}
        <span className={`absolute top-2 left-2 text-xs font-medium px-2 py-0.5 rounded-full ${info.bg} ${info.color} backdrop-blur-sm`}>
          {info.label}
        </span>
        {/* 时长 */}
        <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded flex items-center gap-1 backdrop-blur-sm">
          <Clock className="w-3 h-3" />
          {duration}
        </span>
        {/* 悬停播放按钮 */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5">
          <div className="w-12 h-12 rounded-full bg-primary-600/90 flex items-center justify-center shadow-lg">
            <Play className="w-5 h-5 text-white ml-0.5" />
          </div>
        </div>
      </div>

      {/* 信息 */}
      <div className="p-4">
        <h3 className="font-medium text-gray-800 text-sm leading-snug mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {title}
        </h3>
        {description && (
          <p className="text-xs text-gray-400 mb-2 line-clamp-1">{description}</p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <ExternalLink className="w-3 h-3" />
            外部观看
          </span>
          <Badge variant="default" className="text-[11px]">{source}</Badge>
        </div>
      </div>
    </a>
  );
}
