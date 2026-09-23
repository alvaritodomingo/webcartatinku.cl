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
        // Paleta Tinkubar - Cálida y sofisticada
        parchment: {
          50:  "#fdf8f0",
          100: "#faf0dc",
          200: "#f4ddb5",
          300: "#ecc880",
          400: "#e2ad4e",
          500: "#d4922a",
          600: "#b8741f",
          700: "#8f5518",
          800: "#6b3e18",
          900: "#4a2a12",
        },
        copper: {
          50:  "#fdf4ee",
          100: "#fae5d3",
          200: "#f4c8a5",
          300: "#eca46d",
          400: "#e07a3a",
          500: "#c85e1e",
          600: "#a84916",
          700: "#833614",
          800: "#622a14",
          900: "#3e1a0c",
        },
        teal: {
          50:  "#f0f9f8",
          100: "#d8f0ee",
          200: "#b0e0db",
          300: "#7dc8c0",
          400: "#4eaaa0",
          500: "#358c83",
          600: "#2a706a",
          700: "#245a55",
          800: "#1e4845",
          900: "#163532",
        },
        cream: {
          50:  "#fefdf9",
          100: "#fdf9ee",
          200: "#f9f0d6",
          300: "#f3e3b0",
          400: "#ebd082",
          500: "#e0b84e",
          600: "#c99a2e",
          700: "#9e7422",
          800: "#755420",
          900: "#4e381a",
        },
        charcoal: {
          50:  "#f5f5f4",
          100: "#e8e7e5",
          200: "#d2cfcc",
          300: "#b3afa9",
          400: "#8e8880",
          500: "#6e685f",
          600: "#5a5449",
          700: "#46423a",
          800: "#2e2b25",
          900: "#1a1814",
        },
      },
      fontFamily: {
        display:  ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        serif:    ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
        sans:     ["var(--font-lato)", "Lato", "system-ui", "sans-serif"],
        script:   ["var(--font-playfair)", "cursive"],
      },
      backgroundImage: {
        "paper-texture":    "url('/textures/paper.svg')",
        "leather-texture":  "url('/textures/leather.svg')",
        "ornament-pattern": "url('/textures/ornament.svg')",
      },
      boxShadow: {
        "menu-card":  "0 4px 24px rgba(74, 42, 18, 0.15), 0 1px 4px rgba(74, 42, 18, 0.1)",
        "menu-hover": "0 8px 40px rgba(74, 42, 18, 0.25), 0 2px 8px rgba(74, 42, 18, 0.15)",
        "cover":      "0 20px 60px rgba(26, 24, 20, 0.4), 0 4px 16px rgba(26, 24, 20, 0.2)",
        "float":      "0 8px 32px rgba(200, 94, 30, 0.35)",
        "float-hover":"0 12px 48px rgba(200, 94, 30, 0.5)",
      },
      borderRadius: {
        "menu": "2px",
        "card": "4px",
      },
      animation: {
        "fade-in":     "fadeIn 0.6s ease-out forwards",
        "slide-up":    "slideUp 0.5s ease-out forwards",
        "shimmer":     "shimmer 2s infinite",
        "float-pulse": "floatPulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        floatPulse: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-4px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
