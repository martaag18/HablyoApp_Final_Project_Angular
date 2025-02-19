/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff5757',
      },
    },
  },
  plugins: [require("daisyui")],
};
