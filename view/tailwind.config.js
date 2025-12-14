/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  "./index.html",
  "./src/**/*.{js,jsx,ts,tsx}",
],

  theme: {
    extend: {
      colors: {
        "Rabbit-red": "#ea2e0e",
      }
    },
  },
  plugins: [],
};
  