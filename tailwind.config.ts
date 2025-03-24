import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./sanity/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      screens: {
        xs: "475px"
      },
      colors: {
        primary: {
          "100": "#f48a00",
          DEFAULT: "#e36f11"
        },
        secondary: {
          "50": "#e3ffff",
          "100": "#c7e3e3",
          "200": "rgb(137, 231, 232)",
          "500": "#009698",
          DEFAULT: "#9de1e2"
        },

        black: {
          "10": "#eeeeee",
          "100": "#333333",
          "200": "#141413",
          "300": "#7D8087",
          DEFAULT: "#000000"
        },
        lightgrey: "#f0f0f0",
        white: {
          transparent: "rgba(255, 255, 255, 0)",
          full: "rgba(255, 255, 255, 1)",
          "100": "#F7F7F7",
          DEFAULT: "#FFFFFF"
        }
      },
      backgroundPosition: {
        "0-65": "0% 65%",
        "100-50": "100% 50%"
      },
      fontFamily: {
        "work-sans": ["var(--font-work-sans)"],
        title: ["'DM Serif Text', serif"],
        paragraph: ["'Nunito', sans-serif"]
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      boxShadow: {
        100: "2px 2px 0px 0px rgb(0, 0, 0)",
        200: "2px 2px 0px 2px rgb(0, 0, 0)",
        300: "2px 2px 0px 2px #9de1e2",
        400: "0 -14px 10px 20px rgba(0,0,0,.55);"
      }
    }
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")]
};

export default config;
