import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FF6B35",
          50: "#FFF3ED",
          100: "#FFE4D4",
          200: "#FFC5A8",
          300: "#FF9E71",
          400: "#FF6B35",
          500: "#F04D0E",
          600: "#D13A06",
          700: "#AD2B09",
          800: "#8A2410",
          900: "#702111",
        },
        secondary: {
          DEFAULT: "#F8F8F8",
          50: "#FFFFFF",
          100: "#F8F8F8",
          200: "#EFEFEF",
          300: "#E0E0E0",
          400: "#BDBDBD",
          500: "#9E9E9E",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
