/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/pages/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/components/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    styled: true,
    themes: [
      {
        mytheme: {
          primary: '#f24fd4',
          secondary: '#5deacc',
          accent: '#f7bdbb',
          neutral: '#1C151E',
          'base-100': '#4C384D',
          info: '#A4D6EA',
          success: '#0F753B',
          warning: '#ECB622',
          error: '#EC3C6B',
        },
      },
      'dark',
      'cupcake',
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
  },
}
