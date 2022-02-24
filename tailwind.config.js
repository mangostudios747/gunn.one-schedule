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
      },
      animation:{
        'slide-left':'slideLeft 0.2s linear'
      },
      keyframes: {
        slideLeft: {
          '0%': { transform: 'translateX(4px)' },
          '100%': { transform: 'translateX(0)' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/forms'),
    require('tw-elements/dist/plugin')
  ],
}
