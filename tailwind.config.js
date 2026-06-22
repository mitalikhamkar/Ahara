/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F5F0E8',
        'ahara-orange': '#C8651B',
        'ahara-brown': '#2C1A0E',
        'ahara-text': '#3D2B1A',
        'ahara-muted': '#7A6A5A',
        'meal-green': '#4CAF50',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}