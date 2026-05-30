import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingStyles: Record<string, string> = {
  none: "",
  sm: "p-4",
  md: "p-5",
  lg: "p-6",
};

export default function Card({
  hover = false,
  padding = "md",
  className = "",
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={`bg-white rounded-2xl border border-warm-100/70 shadow-sm ${paddingStyles[padding]} ${
        hover ? "hover:shadow-md hover:border-primary-100/80 transition-all duration-200" : ""
      } ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
