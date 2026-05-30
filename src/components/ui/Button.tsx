import Link from "next/link";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type ButtonBaseProps = {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
};

type ButtonAsButton = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

type ButtonAsLink = ButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const baseStyles =
  "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variantStyles: Record<string, string> = {
  primary: "bg-primary-600 text-white hover:bg-primary-700 shadow-sm",
  secondary: "bg-gray-800 text-white hover:bg-gray-900 shadow-sm",
  outline:
    "border-2 border-primary-500 text-primary-600 hover:bg-primary-50",
  ghost: "text-gray-600 hover:bg-gray-100",
};

const sizeStyles: Record<string, string> = {
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-5 py-2.5 text-sm gap-2",
  lg: "px-6 py-3 text-base gap-2.5",
};

export default function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, ...rest } = props;
  const cls = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className || ""}`;

  if (props.href) {
    const { href, ...linkRest } = props as ButtonAsLink;
    return <Link href={href} className={cls} {...linkRest} />;
  }

  const { ...btnRest } = props as ButtonAsButton;
  return <button className={cls} {...btnRest} />;
}
