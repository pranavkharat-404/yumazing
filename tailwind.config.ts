import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      colors: {
        forest: {
          DEFAULT: "#123527",
          50: "#e8efec",
          100: "#c7d9d0",
          200: "#9fbeae",
          300: "#6f9c85",
          400: "#417a5f",
          500: "#245c40",
          600: "#1a4a33",
          700: "#123527",
          800: "#0c261c",
          900: "#071811",
        },
        cream: {
          DEFAULT: "#FBF6EC",
          50: "#FFFDF9",
          100: "#FBF6EC",
          200: "#F3E9D2",
          300: "#EBDCB8",
        },
        gold: {
          DEFAULT: "#C6972E",
          50: "#FBF1DC",
          100: "#F3DFAF",
          200: "#E5C374",
          300: "#D6AB4C",
          400: "#C6972E",
          500: "#A87A1F",
          600: "#8A6218",
        },
        ink: "#1B2420",
        veg: "#2E7D32",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-jakarta)", "sans-serif"],
      },
      spacing: {
        "4.5": "1.125rem",
        "5.5": "1.375rem",
      },
      borderRadius: {
        "3xl": "1.75rem",
        "4xl": "2.25rem",
      },
      boxShadow: {
        soft: "0 8px 30px -8px rgba(18, 53, 39, 0.18)",
        card: "0 4px 20px -4px rgba(18, 53, 39, 0.12)",
        gold: "0 6px 24px -6px rgba(198, 151, 46, 0.45)",
      },
      backgroundImage: {
        "forest-gradient": "linear-gradient(135deg, #123527 0%, #1A4A33 55%, #245C40 100%)",
        "gold-gradient": "linear-gradient(135deg, #E5C374 0%, #C6972E 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        shimmer: "shimmer 1.8s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
