/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#b2ebf2",
        secondary: "#FF6347",
        background: "#F5F5F5",
        text: "#333333",
        colorsTitle: "#1fa3bb",
        colorTextSemibold: "#1c849e",
        colorTextBold: "#0f303d",
      },
    },
  },
  plugins: [],
};
