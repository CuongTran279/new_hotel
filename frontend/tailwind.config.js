/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}","./public/index.html"],
  theme: {
    extend: {
      width:{
        '1124':'1124px'
      },
      backgroundColor:{
        primary:'#ffffff',
        secondary:'#5392f9',
        third:'#e12d2d'
      },
      dropShadow: {
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
        '4xl': [
            '0 35px 35px rgba(0, 0, 0, 0.25)',
            '0 45px 65px rgba(0, 0, 0, 0.15)'
        ],
        'blue': '0 1px 1px #5392f9',
        'red': '0 1px 1px #e12d2d'
      }
    },
  },
  plugins: [],
}