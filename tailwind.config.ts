import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Core surfaces ──────────────────────────────────────────────
        background: {
          DEFAULT: "#0a0b14",   // Near-black base
          secondary: "#0f1022", // Slightly lighter panel
          tertiary: "#161829",  // Card/modal surfaces
        },
        // ── Primary accent — Gold ───────────────────────────────────────
        gold: {
          50:  "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          DEFAULT: "#f59e0b",
        },
        // ── Secondary accent — Purple ───────────────────────────────────
        purple: {
          50:  "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7e22ce",
          800: "#6b21a8",
          900: "#581c87",
          DEFAULT: "#a855f7",
        },
        // ── Tertiary accent — Cyan ──────────────────────────────────────
        cyan: {
          50:  "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
          DEFAULT: "#06b6d4",
        },
        // ── Semantic UI ─────────────────────────────────────────────────
        border: {
          DEFAULT: "rgba(255,255,255,0.08)",
          glow:    "rgba(245,158,11,0.35)",
          purple:  "rgba(168,85,247,0.35)",
          cyan:    "rgba(6,182,212,0.35)",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        sans:    ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "glow-gold":   "0 0 20px rgba(245,158,11,0.25), 0 0 40px rgba(245,158,11,0.10)",
        "glow-purple": "0 0 20px rgba(168,85,247,0.25), 0 0 40px rgba(168,85,247,0.10)",
        "glow-cyan":   "0 0 20px rgba(6,182,212,0.25),  0 0 40px rgba(6,182,212,0.10)",
        "panel":       "0 4px 24px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":  "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-pattern":    "radial-gradient(ellipse at top, #1a1040 0%, #0a0b14 70%)",
      },
      animation: {
        "glow-pulse":  "glow-pulse 2s ease-in-out infinite",
        "float":       "float 3s ease-in-out infinite",
        "xp-fill":     "xp-fill 0.8s ease-out forwards",
        "level-up":    "level-up 0.6s ease-out",
        "shimmer":     "shimmer 1.5s infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%":       { opacity: "0.6" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":       { transform: "translateY(-6px)" },
        },
        "xp-fill": {
          from: { width: "0%" },
          to:   { width: "var(--xp-width)" },
        },
        "level-up": {
          "0%":   { transform: "scale(1)" },
          "50%":  { transform: "scale(1.15)" },
          "100%": { transform: "scale(1)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
