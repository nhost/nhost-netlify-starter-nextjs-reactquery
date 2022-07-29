/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0f1218",
        header: "#16171a",
        secondary: "#1b212a",
        grayish: "#fafafa",
        list: "#bfbfbf",
        brd: "#363739",
        dim: "#e1dfdf",
        pb: "#76309a",
        card: "#1f2022",
        input: "#222226",
      },
    },
  },
  plugins: [],
};
