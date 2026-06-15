import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        border: "var(--border)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted)",
        card: "var(--surface)",
        primary: {
          DEFAULT: "var(--brand-cyan)",
          foreground: "var(--background)",
        },
        cyan: {
          DEFAULT: "var(--brand-cyan)",
          deep: "var(--brand-cyan-deep)",
        },
        google: {
          blue: "var(--google-blue)",
          red: "var(--google-red)",
          yellow: "var(--google-yellow)",
          green: "var(--google-green)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-outfit)", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
      },
      maxWidth: {
        container: "1400px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shine: {
          "0%": { left: "-100%" },
          "60%, 100%": { left: "100%" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        grow: {
          "0%": { height: "0", opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
        float: "float 4s ease-in-out infinite",
        shine: "shine 3s ease-in-out infinite",
        marquee: "marquee 80s linear infinite",
      },
    },
  },
  plugins: [],
}
export default config
