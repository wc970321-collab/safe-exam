import type { ReactNode } from "react";
import { AlertTriangle, Info, Lightbulb, AlertCircle } from "lucide-react";

type CalloutType = "info" | "tip" | "warning" | "danger";

interface CalloutProps {
  type?: CalloutType;
  children: ReactNode;
}

const config: Record<CalloutType, { icon: typeof Info; bg: string; border: string; text: string; label: string }> = {
  info: {
    icon: Info,
    bg: "bg-blue-50",
    border: "border-blue-400",
    text: "text-blue-800",
    label: "知识点",
  },
  tip: {
    icon: Lightbulb,
    bg: "bg-green-50",
    border: "border-green-400",
    text: "text-green-800",
    label: "学习提示",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-yellow-50",
    border: "border-yellow-400",
    text: "text-yellow-800",
    label: "重点注意",
  },
  danger: {
    icon: AlertCircle,
    bg: "bg-red-50",
    border: "border-red-400",
    text: "text-red-800",
    label: "易错提醒",
  },
};

export default function Callout({ type = "info", children }: CalloutProps) {
  const c = config[type];
  const Icon = c.icon;

  return (
    <div className={`${c.bg} border-l-4 ${c.border} rounded-r-lg p-4 mb-4`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${c.text}`} />
        <div className={`text-sm leading-relaxed ${c.text} [&>p]:mb-1`}>
          <span className="font-semibold text-xs uppercase tracking-wide opacity-70 mr-2">
            {c.label}
          </span>
          {children}
        </div>
      </div>
    </div>
  );
}
