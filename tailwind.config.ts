import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#030303",
        surface: "#090909",
        "surface-2": "#0f0f0f",
        accent: "#c40024",
        "accent-bright": "#e0002a",
        "accent-soft": "#ff3b5c",
        text: "#f5f5f5",
        "text-dim": "#8a8a8a",
        line: "rgba(245,245,245,0.08)",
      },
      fontFamily: {
        display: ["var(--font-oswald)", "sans-serif"],
        body: ["var(--font-space)", "sans-serif"],
        accent: ["var(--font-syne)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
