/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff5757',
        secondary: "#40e0d0",
        tertiary: "#ffcc00"
      },
    },
  },
  plugins: [require("daisyui")],
};
