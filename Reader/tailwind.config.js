/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    backgroundImage: {
      'bg1': "url('./assets/bg1.png')",
    },
    extend: {
      colors: {
        red: '#EF9595',
        orange: '#EFB495',
        yellow: '#EFD595',
        lightYellow: '#D9D9D9',
        lightOrange: '#FFD8C7',
        lightGrey: '#F5F5F5',
        available: '#21BA9E',
        unavailable: '#E66A6A',
        textPrimary: '#263238',
      },
    },
  },
  plugins: [],
})

