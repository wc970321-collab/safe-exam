"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, BookOpen } from "lucide-react";
import { SUBJECTS } from "@/lib/constants";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-warm-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="relative w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all overflow-hidden">
              {/* 书本图标 */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="relative z-10">
                <path d="M4 6h16M4 12h16M4 18h12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <rect x="2" y="3" width="20" height="18" rx="2" stroke="white" strokeWidth="1.5" fill="none"/>
                <path d="M2 6h20" stroke="white" strokeWidth="1.5"/>
              </svg>
            </div>
            <div>
              <div className="font-bold text-sm text-gray-800 leading-tight tracking-tight">
                注安师学习
              </div>
              <div className="text-[11px] text-gray-400 leading-tight">
                免费 · 系统 · 高效
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {SUBJECTS.map((subject) => (
              <Link
                key={subject.slug}
                href={`/${subject.slug}`}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  pathname.startsWith(`/${subject.slug}`)
                    ? "bg-primary-50/80 text-primary-700 shadow-sm"
                    : "text-gray-500 hover:text-gray-700 hover:bg-warm-50/60"
                }`}
              >
                {subject.shortTitle}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-1.5">
            <Link
              href="/hotspots"
              className="hidden md:inline-flex text-xs text-gray-400 hover:text-primary-600 transition-colors px-2.5"
            >
              高频考点
            </Link>
            <Link
              href="/guide"
              className="hidden md:inline-flex text-xs text-gray-400 hover:text-primary-600 transition-colors px-2.5"
            >
              备考指南
            </Link>
            <Link
              href="/search"
              className="p-2.5 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50/60 transition-colors"
              aria-label="搜索"
            >
              <Search className="w-4.5 h-4.5" />
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-warm-50/60 transition-colors"
              aria-label={mobileOpen ? "关闭菜单" : "打开菜单"}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-warm-100/60 py-3 pb-4">
            {SUBJECTS.map((subject) => (
              <Link
                key={subject.slug}
                href={`/${subject.slug}`}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  pathname.startsWith(`/${subject.slug}`)
                    ? "bg-primary-50/80 text-primary-700"
                    : "text-gray-500 hover:bg-warm-50/60"
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-primary-300" />
                <div>{subject.title}</div>
                <span className="ml-auto text-xs text-gray-300">{subject.totalChapters}章</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
