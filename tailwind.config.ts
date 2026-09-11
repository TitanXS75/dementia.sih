import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Theme Colors: Cream White & Olive Green
        "cream": {
          DEFAULT: "#FBF9F4",
          light: "#FFFFFF",
          card: "#F7F5F0",
          border: "#E9E5DB",
          dark: "#EFECE4",
        },
        "olive": {
          DEFAULT: "#1E4334",
          light: "#2D533E",
          hover: "#254F3E",
          dark: "#142F24",
          deep: "#0D2119",
          tint: "#EAF1EC",
          subtle: "#D4E2D8",
        },
        "terracotta": {
          DEFAULT: "#99462A",
          light: "#B25638",
          tint: "#FBECE7",
        },
        "amber-warm": {
          DEFAULT: "#D97706",
          light: "#FDE68A",
          tint: "#FFFBEB",
        },
        // Existing mappings compatibility
        "surface": "#FBF9F4",
        "surface-container": "#F7F5F0",
        "surface-container-low": "#FDFCF9",
        "surface-container-high": "#ECE8DE",
        "surface-container-highest": "#E4DFC2",
        "surface-container-lowest": "#FFFFFF",
        "primary": "#1E4334",
        "primary-container": "#2A5744",
        "primary-fixed": "#D6E8DC",
        "on-primary": "#FFFFFF",
        "on-surface": "#1A1814",
        "on-surface-variant": "#59544D",
        "secondary": "#99462A",
        "secondary-fixed": "#FFDBD0",
        "outline": "#D7D2C5",
        "outline-variant": "#E8E4DA",
      },
      fontFamily: {
        display: ["Newsreader", "Georgia", "serif"],
        serif: ["Newsreader", "Georgia", "serif"],
        sans: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "tactile": "0 2px 0 0 rgba(30, 67, 52, 0.08), 0 8px 24px -4px rgba(30, 67, 52, 0.06)",
        "tactile-hover": "0 4px 0 0 rgba(30, 67, 52, 0.12), 0 16px 32px -4px rgba(30, 67, 52, 0.1)",
        "pill": "0 4px 20px -2px rgba(30, 67, 52, 0.08)",
        "modal": "0 25px 60px -15px rgba(20, 47, 36, 0.25)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
