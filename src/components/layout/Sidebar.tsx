"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Video, GitCompare, Network, ArrowLeft } from "lucide-react";
import type { ChapterMeta } from "@/lib/types";
import { getProgress } from "@/lib/quizzes";

interface SidebarProps {
  subject: string;
  chapters: ChapterMeta[];
}

export default function Sidebar({ subject, chapters }: SidebarProps) {
  const pathname = usePathname();
  const progress = typeof window !== "undefined" ? getProgress() : {};

  return (
    <aside className="w-64 flex-shrink-0 hidden lg:block">
      <div className="sticky top-20">
        <nav className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50">
            <h3 className="font-semibold text-gray-900 text-sm">章节导航</h3>
          </div>
          <div className="max-h-[60vh] overflow-y-auto">
            {chapters.map((ch) => {
              const isActive = pathname.includes(`/${subject}/${ch.slug}`);
              const quizKey = `${subject}/${ch.slug}`;
              const done = progress[quizKey]?.completed;

              return (
                <Link
                  key={ch.slug}
                  href={`/${subject}/${ch.slug}`}
                  className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors border-b border-gray-50 last:border-b-0 ${
                    isActive
                      ? "bg-primary-50 text-primary-700 font-medium border-l-2 border-l-primary-500"
                      : "text-gray-600 hover:bg-gray-50 border-l-2 border-l-transparent"
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-semibold flex-shrink-0 ${
                      done
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {done ? "✓" : ch.number}
                  </span>
                  <span className="truncate">{ch.title}</span>
                  <span className="ml-auto flex gap-0.5 flex-shrink-0">
                    {Array.from({ length: ch.examWeight }).map((_, i) => (
                      <span key={i} className="text-amber-400 text-xs">
                        ★
                      </span>
                    ))}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="mt-4 bg-white rounded-xl border border-gray-200 shadow-sm p-3 space-y-1">
          <Link
            href={`/${subject}/bisai`}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Video className="w-4 h-4 text-primary-500" />
            免费视频课程
          </Link>
          <Link
            href={`/${subject}/compare`}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <GitCompare className="w-4 h-4 text-green-500" />
            易混知识点对比
          </Link>
          <Link
            href={`/${subject}/mindmaps`}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Network className="w-4 h-4 text-purple-500" />
            思维导图
          </Link>
        </div>

        <Link
          href="/"
          className="mt-3 flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          返回首页
        </Link>
      </div>
    </aside>
  );
}
