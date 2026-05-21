import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base: "#0A0A0B",
          elevated: "#131316",
          card: "#17171B",
        },
        line: {
          subtle: "#1F1F23",
          strong: "#2A2A30",
        },
        brand: {
          orange: "#FF6A1A",
          orangeDeep: "#E55A12",
          orangeSoft: "#FF8A4D",
        },
        ink: {
          primary: "#FFFFFF",
          muted: "#A1A1AA",
          dim: "#6B6B73",
        },
        accent: {
          blue: "#3B82F6",
          green: "#22C55E",
          yellow: "#FACC15",
          purple: "#A855F7",
          red: "#EF4444",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "radial-orange":
          "radial-gradient(ellipse at center, rgba(255,106,26,0.35) 0%, rgba(255,106,26,0.08) 35%, transparent 70%)",
        "grid-faint":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      boxShadow: {
        glow: "0 0 80px -10px rgba(255,106,26,0.55)",
        phone:
          "0 30px 80px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        pulseGlow: "pulseGlow 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
