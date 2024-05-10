import type { Config } from "tailwindcss";
import daisyui from 'daisyui';

const config: Config = {
  plugins: [daisyui],

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
        "100": "100",
        "200": "200",
      },
    },
  },

  daisyui: {
    themes: [
      {
        sample: {
          primary: "#ff0000",
          secondary: "#f6d860",
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#ffffff",

          "--rounded-box": "1rem", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "0.5rem", // border radius rounded-btn utility class, used in buttons and similar element
          "--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
          "--animation-btn": "0.25s", // duration of animation when you click on button
          "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
          "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
          "--border-btn": "1px", // border width of buttons
          "--tab-border": "1px", // border width of tabs
          "--tab-radius": "0.5rem", // border radius of tabs
          "--tab-bg": "green"
        },
      },
      "light",
      "dark",
      "cupcake",
    ],
  },
};
export default config;
