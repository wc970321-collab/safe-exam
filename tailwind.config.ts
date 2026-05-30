import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef6ff",
          100: "#d9ecff",
          200: "#bcddff",
          300: "#8ec8ff",
          400: "#52a8fa",
          500: "#2d89f0",
          600: "#1a6ad9",
          700: "#1553b5",
          800: "#174493",
          900: "#1a3b7a",
        },
        accent: {
          50: "#fdf4e6",
          100: "#fae3c0",
          200: "#f5c990",
          300: "#f0ab5e",
          400: "#e88c35",
          500: "#d9731f",
          600: "#b85d18",
        },
        warm: {
          50: "#f8f7f4",
          100: "#f0ede6",
          200: "#f5f0eb",
          300: "#e6dfd3",
          400: "#d6cdbc",
          500: "#c6baa3",
        },
      },
      fontFamily: {
        sans: [
          '"Noto Sans SC"',
          '"PingFang SC"',
          '"Microsoft YaHei"',
          '"Hiragino Sans GB"',
          "sans-serif",
        ],
        mono: ['"JetBrains Mono"', '"Fira Code"', "monospace"],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
