const { ui } = require('./src/features/ui/config.ts')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: ui.colors,
    extend: {
      btnSize: ui.btnSize,
      inputSize: ui.inputSize,
      boxShadow: {
        md: '0px 10px 16px rgba(0, 0, 0, 0.06), 0px 2px 4px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  safelist: [
    {
      pattern: /(bg|text|border|ring)-(primary|gray|red|green|yellow)$/,
      variants: ['active', 'hover', 'focus', 'checked', 'peer-checked'],
    },
    {
      pattern: /(bg)-(primary|gray|red|green|yellow)-600$/,
      variants: ['hover'],
    },
  ],
  plugins: [require('@qpokychuk/tailwind-button-plugin'), require('./tailwind.input')],
}
