/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cinematic: {
          950: '#050505',
          900: '#0a0a0a',
          800: '#111111',
          700: '#1a1a1a',
          600: '#262626',
          500: '#333333',
          400: '#4d4d4d',
          300: '#808080',
          200: '#bfbfbf',
          100: '#e6e6e6',
          50: '#f5f5f5',
        },
        accent: {
          gold: '#d4af37',
          crimson: '#dc143c',
          ember: '#ff6b35',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};
