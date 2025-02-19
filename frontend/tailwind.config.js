/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff5757',
        secondary: "#e04747",
      },
    },
  },
  plugins: [require("daisyui")],
};
