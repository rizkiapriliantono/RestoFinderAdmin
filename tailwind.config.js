/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        customGreen: '#aadfb7',
        customGreenHover: '#9ad6a9',
      },
    },
  },
  plugins: [],
}
