import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brief palette: navy, teal, cyan, soft gray on white
        navy: {
          DEFAULT: "#0B2540",
          50: "#eef3f8",
          100: "#d7e2ee",
          600: "#143a63",
          700: "#0E2A47",
          800: "#0B2540",
          900: "#071a30",
        },
        teal: {
          DEFAULT: "#0E7C86",
          50: "#e6f5f6",
          500: "#0F8A8D",
          600: "#0E7C86",
          700: "#0a5f67",
        },
        cyan: {
          DEFAULT: "#22B8CF",
          400: "#3ec9dd",
          500: "#22B8CF",
        },
        ink: "#0B2540",
        muted: "#5B6B7B",
        surface: "#F4F7FA",
        line: "#E2E9F0",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,37,64,0.04), 0 8px 24px -12px rgba(11,37,64,0.12)",
        lift: "0 6px 16px -6px rgba(11,37,64,0.18), 0 20px 40px -24px rgba(14,124,134,0.25)",
      },
      borderRadius: {
        xl: "0.9rem",
        "2xl": "1.25rem",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        dash: {
          to: { strokeDashoffset: "0" },
        },
        pulseSoft: {
          "0%,100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both",
        pulseSoft: "pulseSoft 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
