import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#18293d",
        mint: "#fff0d6",
        green: "#f45b35",
        coral: "#e64252",
        cream: "#fff8eb",
        citrus: "#ffc857",
        ocean: "#19a7b8",
        leaf: "#72a92c",
        plum: "#984f8f"
      },
      boxShadow: { soft: "0 14px 38px rgba(24,41,61,.10)", purchase: "0 14px 30px rgba(242,107,56,.22)" }
    }
  },
  plugins: []
};

export default config;
