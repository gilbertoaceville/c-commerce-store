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
      backgroundColor: {
        gradientPrimary: "var(--background-gradient)",
      },
    },
  },
  plugins: [],
} satisfies Config;
