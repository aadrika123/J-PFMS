import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "325px",
      tmp: "1100px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#3A3838",
        secondary: "#4F4F55",
        // primary_bg_indigo: "#12743B",
        primary_green: "#4338ca",
        primary_bg_indigo: "#4338ca", // We are not using it for now, will use it  #6366f1
        primary_bg_gray: "#e5e7eb", // We are not using it for now, will use it
        secondary_black: "#000000",
        primary_bg: "#F8FFF7",
      },
      fontSize: {
        sub_head: " 1.22294rem",
      },
      zIndex: {
        '100': '100',
        '200': '200'
      }
    },
  },
  plugins: [require("daisyui")],
};
export default config;
