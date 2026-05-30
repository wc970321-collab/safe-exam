import type { Metadata } from "next";
import Script from "next/script";
import { buildMetadata } from "@/lib/seo";
import SearchBox from "@/components/search/SearchBox";

export const metadata: Metadata = buildMetadata({
  title: "全站搜索",
  description: "搜索平台所有学习资料，快速找到需要的知识点和章节内容。",
  path: "/search",
});

export default function SearchPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <Script src="/pagefind/pagefind.js" strategy="lazyOnload" />
      <h1 className="text-2xl font-bold text-gray-900 mb-2">全站搜索</h1>
      <p className="text-gray-500 mb-8">
        搜索所有学习资料，输入关键词即可快速定位相关章节和考点。
      </p>
      <div id="search" />
      <SearchBox />
    </div>
  );
}
