// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
        amoresa: ["Amoresa", "serif"],
        times: ["TimesNewRoman", "serif"],
        ttcommons: ["TTCommons", "sans-serif"],
      },
      colors: {
        navy: {
          50: "#e8eaf6",
          100: "#c5cae9",
          600: "#283593",
          700: "#1a237e",
          800: "#151b6b",
        },
        rose: {
          vivid: "#d81b60",
          deep: "#e91e8c",
          mid: "#f48fb1",
          blush: "#fce4ec",
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
