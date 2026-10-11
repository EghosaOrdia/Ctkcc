/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Change the whole look of the app here.
        navy: {
          50: '#eef1f7',
          100: '#d9e0ee',
          200: '#b3c0dc',
          300: '#8296be',
          400: '#53699b',
          500: '#344a7c',
          600: '#243762',
          700: '#1a2a4d',
          800: '#121e3a',
          900: '#0b1428',
        },
        gold: {
          50: '#fdf8eb',
          100: '#faeec9',
          200: '#f4dc92',
          300: '#ecc55a',
          400: '#e3ae34',
          500: '#c9932a',
          600: '#a87420',
          700: '#855720',
        },
        paper: '#f8f5ef',
        ink: '#1e2433',
      },
      fontFamily: {
        sans: ['Figtree', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(18, 30, 58, 0.05), 0 4px 16px rgba(18, 30, 58, 0.06)',
        lift: '0 8px 30px rgba(18, 30, 58, 0.14)',
      },
    },
  },
  plugins: [],
}
