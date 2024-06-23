import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        //xs: "480px",
        //sm: "640px",
        //md: "768px",
        //lg: "1024px",
        //xl: "1280px",
        "2xl": "1536px",
      },
    },
    extend: {},
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
};
export default config;
