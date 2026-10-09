/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: '#103c3b',
        emerald: '#1e8a68',
        coral: '#ff7058',
        sunshine: '#f4c95d',
        cream: '#fff9f0',
        ink: '#172625',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        soft: '0 24px 70px rgba(16, 60, 59, 0.12)',
      },
    },
  },
  plugins: [],
}
