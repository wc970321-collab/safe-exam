"use client";

import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";

export default function SearchBox() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const retriesRef = useRef(30);

  useEffect(() => {
    let cancelled = false;

    function tryInit() {
      if (cancelled) return;
      const PUI = (window as any).PagefindUI;
      if (PUI) {
        try {
          new PUI({
            element: "#search",
            showSubResults: true,
            showImages: false,
            autofocus: true,
            translations: {
              placeholder: "搜索知识点、章节、法条...",
              clear_search: "清除",
              load_more: "加载更多结果",
              search_label: "搜索全站",
            },
          });
          setLoading(false);
        } catch {
          setLoading(false);
          setError(true);
        }
        return;
      }
      retriesRef.current--;
      if (retriesRef.current > 0) {
        setTimeout(tryInit, 300);
      } else {
        setLoading(false);
        setError(true);
      }
    }

    tryInit();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-[300px]">
      {loading && (
        <div className="flex items-center justify-center py-16">
          <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {error && (
        <div className="text-center py-16">
          <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">
            搜索服务暂时不可用。请先浏览章节内容，或使用浏览器的页面搜索功能（Ctrl+F）。
          </p>
        </div>
      )}
    </div>
  );
}
