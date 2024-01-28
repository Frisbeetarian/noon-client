/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/pages/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/components/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#000',
        red: {
          50: '#F8E6E5',
          100: '#F1CDCB',
          200: '#E9B3B0',
          300: '#E29A96',
          400: '#DA807C',
          500: '#921A1C',
          600: '#7A1618',
          700: '#631214',
          800: '#4B0E10',
          900: '#5E1F1E',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
