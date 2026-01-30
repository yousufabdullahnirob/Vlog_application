/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        // You can add custom premium colors here if needed
        primary: {
           50: '#ecfeff',
           100: '#cffafe',
           500: '#06b6d4',
           600: '#0891b2',
           700: '#0e7490',
        }
      }
    },
  },
  plugins: [],
}
