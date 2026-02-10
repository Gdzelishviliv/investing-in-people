import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--primary) / <alpha-value>)",
        "primary-dark": "#631515",
        secondary: "#92959c",
        accent: "#dbb9b9",
        light: "#f4f6f8",
        muted: "#6b7280",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      spacing: {
        "62.5": "15.625rem",
        "87.5": "21.875rem",
      },
      container: {
        center: true,
        padding: "1rem",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-in-out",
        "fade-in-up": "fadeInUp 0.6s ease-in-out",
      },
      backgroundImage: {
        "linear-to-b": "linear-gradient(to bottom, var(--tw-gradient-stops))",
        "linear-to-r": "linear-gradient(to right, var(--tw-gradient-stops))",
        "linear-to-br": "linear-gradient(to bottom right, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
