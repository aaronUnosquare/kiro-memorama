/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mexican-orange': '#FF6B35',
        'mexican-purple': '#2D1B69',
        'mexican-gold': '#FFD700',
        'blood-red': '#8B0000',
        'bone-white': '#F5F5DC'
      },
      fontFamily: {
        'creepy': ['Creepster', 'cursive'],
        'body': ['Inter', 'sans-serif']
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounce 1s ease-in-out 2'
      }
    },
  },
  plugins: [],
}