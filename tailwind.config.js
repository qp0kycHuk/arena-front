const { ui } = require('./src/features/ui/config.ts')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: ui.colors,
    screens: ui.screens,
    extend: {
      btnSize: ui.btnSize,
      inputSize: ui.inputSize,
      boxShadow: {
        md: '0px 10px 16px rgba(0, 0, 0, 0.06), 0px 2px 4px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [
    require('@qpokychuk/tailwind-button-plugin'),
    require('@qpokychuk/tailwind-input-plugin')({
      border: "1px solid theme('colors.default / 20%')",
    }),
    require('@qpokychuk/tailwind-ratio-plugin'),
  ],
}
