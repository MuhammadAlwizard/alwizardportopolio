import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#F3F2EE",
          raised: "#FBFAF8",
          deep: "#E8E6DF",
        },
        ink: {
          DEFAULT: "#17181C",
          soft: "#45484F",
          faint: "#62656D",
        },
        line: "#D9D7D0",
        accent: {
          DEFAULT: "#C23B17",
          dark: "#9E2F11",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      borderRadius: {
        card: "6px",
      },
    },
  },
  plugins: [],
};
export default config;
