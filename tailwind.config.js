/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      bg: {
        primary: "#0f1218",
        header: "#0e182700",
      },
    },
  },
  plugins: [],
};
