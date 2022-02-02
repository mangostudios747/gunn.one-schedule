const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      fontFamily:{
        sans: ['Quicksand','ui-sans-serif','system-ui']
      },
      colors: {
        gray: colors.slate,
        water: '#E5EAF0',
        primary: colors.blue,
        secondary: colors.sky,
        slate: {
          750: '#313A54'
        }
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
}
