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
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(to top, rgb(var(--color-gradient-primary)), rgb(var(--color-gradient-secondary)))"
      }
    },
  },
  plugins: [],
} satisfies Config;