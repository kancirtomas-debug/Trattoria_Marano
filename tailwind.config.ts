import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  "#fdf3f0",
          100: "#fae4de",
          200: "#f5c9bc",
          300: "#eda593",
          400: "#e27a63",
          500: "#c96b55",
          600: "#b85a44",
          700: "#994838",
          800: "#7e3d31",
          900: "#68352c",
          950: "#3a1a15",
        },
        accent: {
          50:  "#f4f1f9",
          100: "#ebe5f5",
          200: "#d8ceec",
          300: "#baaede",
          400: "#9785cb",
          500: "#7b65b8",
          600: "#6a52a3",
          700: "#5a4389",
          800: "#4c3972",
          900: "#40325e",
          950: "#281e3e",
        },
        neutral: {
          50:  "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          950: "#0a0a0a",
        },
        cream: {
          50:  "#fdfaf6",
          100: "#faf4ec",
          200: "#f4e6d3",
        },
      },
      fontFamily: {
        sans:    ["var(--font-sans)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "Georgia", "serif"],
      },
      boxShadow: {
        "soft":    "0 10px 15px -3px rgba(0,0,0,0.06), 0 4px 6px -4px rgba(0,0,0,0.06)",
        "soft-lg": "0 20px 25px -5px rgba(0,0,0,0.08), 0 8px 10px -6px rgba(0,0,0,0.06)",
        "soft-xl": "0 25px 50px -12px rgba(0,0,0,0.14)",
        "warm":    "0 10px 40px rgba(201,107,85,0.2)",
      },
      keyframes: {
        "fade-in-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%":   { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "shimmer": {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.6s ease-out",
        "scale-in":   "scale-in 0.3s ease-out",
        "shimmer":    "shimmer 2s linear infinite",
      },
    },
  },
  plugins: [],
}

export default config
