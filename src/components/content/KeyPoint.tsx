import type { ReactNode } from "react";
import { Star } from "lucide-react";

interface KeyPointProps {
  examWeight?: number;
  children: ReactNode;
}

export default function KeyPoint({ examWeight = 1, children }: KeyPointProps) {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg p-4 mb-4">
      <div className="flex items-start gap-3">
        <div className="flex gap-0.5 flex-shrink-0 mt-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < examWeight
                  ? "fill-amber-400 text-amber-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <div>
          <span className="text-xs font-semibold text-amber-700 bg-amber-200 px-2 py-0.5 rounded mb-1 inline-block">
            考点
          </span>
          <p className="text-sm text-gray-800 mt-1.5 leading-relaxed">{children}</p>
        </div>
      </div>
    </div>
  );
}
