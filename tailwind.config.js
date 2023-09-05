/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/*.handlebars',
    './views/layouts/*.handlebars'],
  theme: {
    fontFamily: {
      'montserrat': ['Montserrat'],
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    extend: {},
    container: {
      center: true,
    },
  },
  plugins: [],
}