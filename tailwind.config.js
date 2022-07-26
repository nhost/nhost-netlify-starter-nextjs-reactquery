/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0f1218",
        header: "#0e1827",
        secondary: "#1b212a",
        grayish: "#fafafa",
      },
    },
  },
  plugins: [],
};
