import type { Config } from "tailwindcss";

module.exports = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        clamp: "clamp(1.2rem, 4vw, 1.4rem)",
      },
      colors: {
        accent: "rgb(var(--color-accent))",
        primary: "rgb(var(--color-primary))",
        secondary: "rgb(var(--color-secondary))",
        tertiary: "rgb(var(--color-tertiary))",
        foreground: "rgb(var(--color-foreground))",
        alpha: "rgb(var(--color-alpha))",
      },
      backgroundColor: {
        tertiary: "rgb(var(--color-tertiary))",
        primary: "rgb(var(--color-primary))",
        foreground: "rgb(var(--color-foreground))",
      },
      backgroundImage: {
        "gradient-primary":
          "linear-gradient(to top, rgb(var(--color-gradient-primary)), rgb(var(--color-gradient-secondary)))",
        "gradient-secondary":
          "linear-gradient(to bottom, rgb(var(--color-tertiary)), rgb(var(--color-accent)))",
      },
      keyframes: {
        "move-left": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(-4px)" },
        },
        "move-right": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(4px)" },
        },
        "icon-animation": {
          "0%, 100%": { background: "rgb(var(--color-gradient-primary))" },
          "50%": { background: "rgb(var(--color-secondary))" },
        },
      },
      animation: {
        "move-left": "move-left 1.5s ease-in-out infinite",
        "move-right": "move-right 1.5s ease-in-out infinite",
        "icon-animation": "icon-animation 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
