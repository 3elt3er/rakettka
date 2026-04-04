/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          500: '#3b82f6',
          700: '#1d4ed8',
          900: '#1e3a8a',
          ink: '#243f66',
        },
      },
      boxShadow: {
        soft: '0 0.5rem 2rem -0.75rem rgb(15 23 42 / 0.25)',
      },
      height: {
        100: '25rem',
      },
    },
  },
  plugins: [],
};
