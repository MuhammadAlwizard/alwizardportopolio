import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#070B14",
          900: "#0B1120",
          800: "#111A2E",
          700: "#1A2740",
          600: "#243453",
        },
        gold: {
          400: "#E8C77E",
          500: "#D4AF5A",
          600: "#B8924A",
        },
        ivory: "#F3EFE6",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      backgroundImage: {
        "grain": "radial-gradient(circle at 1px 1px, rgba(212,175,90,0.08) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};
export default config;
