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
        // Theme Colors: Warm Sandalwood, Heritage Pine, Surya Gold & Terracotta
        "cream": {
          DEFAULT: "#FAF7F2",
          light: "#FFFFFF",
          card: "#F5EFEB",
          border: "#E6DDD0",
          dark: "#EDE5D8",
        },
        "sandalwood": {
          DEFAULT: "#FAF7F2",
          light: "#FFFFFF",
          card: "#F5EFEB",
          border: "#E6DDD0",
          dark: "#EDE5D8",
        },
        "olive": {
          DEFAULT: "#1B382B",
          light: "#2A4D3D",
          hover: "#234335",
          dark: "#12241C",
          deep: "#0D1A14",
          tint: "#EBF2EE",
          subtle: "#D2E2D9",
        },
        "heritage": {
          DEFAULT: "#1B382B",
          light: "#2A4D3D",
          hover: "#234335",
          dark: "#12241C",
          deep: "#0D1A14",
          tint: "#EBF2EE",
          subtle: "#D2E2D9",
        },
        "terracotta": {
          DEFAULT: "#B24A2B",
          light: "#C85837",
          tint: "#FAECE8",
        },
        "amber-warm": {
          DEFAULT: "#D97706",
          light: "#F59E0B",
          glow: "#E58A18",
          tint: "#FEF3C7",
        },
        "surya": {
          DEFAULT: "#D97706",
          light: "#F59E0B",
          glow: "#E58A18",
          tint: "#FEF3C7",
        },
        // Existing mappings compatibility
        "surface": "#FAF7F2",
        "surface-container": "#F5EFEB",
        "surface-container-low": "#FAF7F2",
        "surface-container-high": "#EBE3D5",
        "surface-container-highest": "#DFD6C4",
        "surface-container-lowest": "#FFFFFF",
        "primary": "#1B382B",
        "primary-container": "#274C3B",
        "primary-fixed": "#D4E5DC",
        "on-primary": "#FFFFFF",
        "on-surface": "#1F1914",
        "on-surface-variant": "#5E544B",
        "secondary": "#B24A2B",
        "secondary-fixed": "#FADBD2",
        "accent": "#D97706",
        "accent-glow": "#E58A18",
        "outline": "#D9D0C1",
        "outline-variant": "#E8E0D2",
      },
      fontFamily: {
        display: ["Newsreader", "Georgia", "serif"],
        serif: ["Newsreader", "Georgia", "serif"],
        sans: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "tactile": "0 2px 0 0 rgba(27, 56, 43, 0.08), 0 8px 24px -4px rgba(27, 56, 43, 0.06)",
        "tactile-hover": "0 4px 0 0 rgba(27, 56, 43, 0.12), 0 16px 32px -4px rgba(27, 56, 43, 0.1)",
        "pill": "0 4px 20px -2px rgba(27, 56, 43, 0.08)",
        "modal": "0 25px 60px -15px rgba(18, 36, 28, 0.25)",
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
