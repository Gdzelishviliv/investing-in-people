import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#8b1e1e",
        primaryDark: "#631515",
        secondary:"#92959c",
        light: "#f4f6f8",
        text: "#dbb9b9",
        muted: "#6b7280",
      },
      container: {
        center: true,
        padding: "1rem",
      },
    },
  },
  plugins: [],
};
export default config;
