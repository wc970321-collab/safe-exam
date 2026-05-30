import type { ReactNode } from "react";
import { Lightbulb } from "lucide-react";

interface ExamTipProps {
  children: ReactNode;
}

export default function ExamTip({ children }: ExamTipProps) {
  return (
    <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-4">
      <div className="flex items-start gap-3">
        <Lightbulb className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-primary-800 leading-relaxed">
          <span className="font-semibold text-xs uppercase tracking-wide text-primary-500 mr-2">
            应试技巧
          </span>
          {children}
        </div>
      </div>
    </div>
  );
}
