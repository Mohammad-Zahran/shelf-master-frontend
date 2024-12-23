/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        steelBlue: '#4682B4',
        lightBlue: '#C8E6FF',
        black: '#000000',
        charcoal: '#36454F',
        cerebralGray: '#CCCCCC',
        white: '#FFFFFF'
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

