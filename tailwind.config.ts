import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./contents/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    screens: {
      "2xs": "376px",
      xs: "481px",
      sm: "641px",
      md: "769px",
      lg: "1025px",
      xl: "1281px"
    },
    extend: {
      fontFamily: {
        guerrilla: ["Protest Guerrilla", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"]
      },
      colors: {
        main: {
          DEFAULT: "rgba(var(--text-0))",
          1: "rgba(var(--text-1))"
        },
        card: {
          DEFAULT: "rgba(var(--bg-card-color))"
        },
        light: {
          DEFAULT: "rgba(255,255,255)",
          1: "rgba(206,206,251)",
          2: "rgba(107,114,128)"
        },
        dark: {
          DEFAULT: "rgba(0,0,0)",
          1: "rgba(49,49,49)",
          2: "rgba(24,24,27)"
        },
        tale: {
          DEFAULT: "rgba(var(--tale-0))",
          1: "rgba(var(--tale-1))"
        },
        danger: {
          DEFAULT: "rgba(var(--danger))",
        }
      },
      lineClamp: {
        7: '7',
        8: '8',
        9: '9',
        10: '10'
      }
    },
  },
  plugins: []
};

export default config;