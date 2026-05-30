"use client";

import { Network } from "lucide-react";

interface MindMapNode {
  label: string;
  children?: MindMapNode[];
}

interface MindMapEmbedProps {
  title: string;
  nodes?: MindMapNode[];
  summary?: string;
}

// 考点难度星级
function Stars({ level }: { level: number }) {
  return (
    <span className="inline-flex gap-0.5 ml-1">
      {Array.from({ length: level }).map((_, i) => (
        <span key={i} className="text-amber-400 text-xs">★</span>
      ))}
    </span>
  );
}

function renderGrid(node: MindMapNode, depth: number = 0): JSX.Element {
  const hasChildren = node.children && node.children.length > 0;

  if (depth === 0) {
    // 根节点：核心标题
    return (
      <div className="space-y-4">
        {/* 核心节点 - 居中大标题 */}
        <div className="flex justify-center mb-2">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl shadow-sm font-bold text-sm">
            <Network className="w-4 h-4" />
            {node.label}
          </div>
        </div>

        {/* 子节点网格 */}
        {hasChildren && (
          <div className="flex flex-wrap justify-center gap-3">
            {node.children!.map((child, i) => (
              <div key={i} className="w-[calc(50%-0.375rem)] sm:w-[calc(33.33%-0.5rem)] lg:w-[calc(25%-0.5625rem)] min-w-[180px]">
                {renderGrid(child, 1)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (depth === 1) {
    // 一级节点：主题卡片
    return (
      <div className="bg-white rounded-xl border border-warm-100/80 shadow-sm overflow-hidden h-full">
        <div className="bg-gradient-to-r from-primary-50 to-primary-100/50 px-3 py-2 border-b border-warm-100/60">
          <div className="text-xs font-semibold text-primary-700">{node.label}</div>
        </div>
        {hasChildren && (
          <div className="p-2.5 space-y-1">
            {node.children!.map((child, i) => (
              <div key={i}>{renderGrid(child, 2)}</div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (depth === 2) {
    // 二级节点：考点条目
    return (
      <div className="flex items-start gap-1.5 py-1 px-1.5 rounded-md hover:bg-warm-50/50 transition-colors">
        <div className="w-1.5 h-1.5 rounded-full bg-primary-300 mt-1.5 flex-shrink-0" />
        <div>
          <span className="text-xs text-gray-700 leading-relaxed">{node.label}</span>
          {hasChildren && (
            <div className="mt-0.5 pl-2 space-y-0.5">
              {node.children!.map((child, i) => (
                <div key={i} className="text-xs text-gray-400 flex items-start gap-1">
                  <span className="text-gray-300">·</span>
                  <span>{child.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // 更深层级
  return (
    <div className="text-xs text-gray-400 pl-2 py-0.5">
      · {node.label}
    </div>
  );
}

export default function MindMapEmbed({ title, nodes }: MindMapEmbedProps) {
  if (!nodes || nodes.length === 0) {
    return (
      <div className="mb-4 rounded-2xl border border-warm-100/60 bg-white shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-warm-100/60 bg-gradient-to-r from-primary-50/50 to-warm-50/50">
          <div className="w-7 h-7 rounded-lg bg-primary-100 flex items-center justify-center">
            <Network className="w-4 h-4 text-primary-600" />
          </div>
          <h4 className="font-semibold text-gray-800 text-sm">{title}</h4>
        </div>
        <div className="flex flex-col items-center justify-center py-10 text-gray-300">
          <Network className="w-10 h-10 mb-2" />
          <p className="text-sm">思维导图内容更新中</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4 rounded-2xl border border-warm-100/60 bg-warm-50/30 shadow-sm overflow-hidden">
      {/* 头部 */}
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-warm-100/60 bg-white">
        <div className="w-7 h-7 rounded-lg bg-primary-100 flex items-center justify-center">
          <Network className="w-4 h-4 text-primary-600" />
        </div>
        <h4 className="font-semibold text-gray-800 text-sm">{title}</h4>
      </div>

      {/* 导图内容 - 考点地图网格布局 */}
      <div className="p-4 sm:p-5">
        <div className="space-y-6">
          {nodes.map((rootNode, i) => (
            <div key={i}>{renderGrid(rootNode)}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
