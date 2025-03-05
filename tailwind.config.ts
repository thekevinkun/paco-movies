import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        guerrilla: ["Protest Guerrilla", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"]
      },
      colors: {
        white: {
          DEFAULT: "#FFFFFF",
          1: "#CECEFB"
        },
        dark: {
          DEFAULT: "#000",
          2: "#313131"
        },
        tale: {
          DEFAULT: "#008080",
          1: "rgba(0, 128, 128, 0.20)"
        },
        red: {
          DEFAULT: "#FF0F0F",
          1: "#b30202"
        }
      }
    },
  },
  plugins: [require("@tailwindcss/typography")]
};

export default config;