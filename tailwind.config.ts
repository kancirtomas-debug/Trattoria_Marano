import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Zapier design system
        cream:             "#fffefb",   // Canvas White — page background
        "cream-light":     "#fffdf9",   // Off-White — secondary surface
        ink:               "#201515",   // Zapier Black — primary text
        "ink-light":       "#36342e",   // Dark Charcoal — secondary text
        "ink-muted":       "#939084",   // Warm Gray — muted labels
        terracotta:        "#6b1535",   // Zapier Orange — primary CTA accent
        "terracotta-light":"#ff7a40",   // Lighter orange
        "terracotta-dark": "#cc3e00",   // Darker orange
        sand:              "#c5c0b1",   // Sand — border & structural color
        "sand-light":      "#eceae3",   // Light Sand — ghost buttons, surfaces
        charcoal:          "#201515",   // Dark footer/sections (same as ink)
        "charcoal-light":  "#2d2d2e",   // Slightly lifted dark
        warmgray: {
          100: "#f5f4f1",
          200: "#eceae3",   // Light Sand
          300: "#dbd9d1",
          400: "#c5c0b1",   // Sand
          500: "#939084",   // Warm Gray
          600: "#6b6660",
          700: "#4d4843",
          800: "#36342e",   // Dark Charcoal
          900: "#201515",   // Ink / Zapier Black
        },
      },
      fontFamily: {
        sans:    ["var(--font-sans)", "system-ui", "sans-serif"],
        heading: ["'PointPanther'", "var(--font-heading)", "system-ui", "sans-serif"],
        display: ["'PointPanther'", "var(--font-heading)", "system-ui", "sans-serif"],
        mono:    ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(3.5rem, 8vw, 7rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.5rem, 5.5vw, 4.5rem)", { lineHeight: "1.0", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.75rem, 3.5vw, 2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        "label":      ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.2em" }],
      },
      boxShadow: {
        "soft":    "0 10px 15px -3px rgba(0,0,0,0.04), 0 4px 6px -4px rgba(0,0,0,0.03)",
        "soft-lg": "0 20px 25px -5px rgba(0,0,0,0.06), 0 8px 10px -6px rgba(0,0,0,0.04)",
        "warm":    "0 10px 40px rgba(201,107,85,0.15)",
        "inner-warm": "inset 0 2px 20px rgba(201,107,85,0.08)",
      },
      borderRadius: {
        "oval": "50%",
        "pill": "9999px",
      },
      keyframes: {
        "reveal-up": {
          "0%":   { opacity: "0", transform: "translateY(32px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "reveal-left": {
          "0%":   { opacity: "0", transform: "translateX(32px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "grow-line": {
          "0%":   { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.4" },
          "50%":      { opacity: "0.8" },
        },
      },
      animation: {
        "reveal-up":   "reveal-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        "reveal-left": "reveal-left 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        "grow-line":   "grow-line 1s cubic-bezier(0.16, 1, 0.3, 1) both",
        "pulse-soft":  "pulse-soft 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}

export default config
