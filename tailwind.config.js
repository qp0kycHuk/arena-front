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
  plugins: [
    require('@qpokychuk/tailwind-button-plugin'),
    require('@qpokychuk/tailwind-ratio-plugin'),
    require('./tailwind.input'),
  ],
}
