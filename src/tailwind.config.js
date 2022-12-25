/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      white: "#fff",
      black: "#000",
      primary: {
        50: '#f4faff',
        100: '#e8f5ff',
        200: '#c6e6fe',
        300: '#a3d7fe',
        400: '#5eb8fd',
        500: '#199afc',
        600: '#178be3',
        700: '#1374bd',
        800: '#0f5c97',
        900: '#0c4b7b',
        DEFAULT: '#199afc'
      },
    },

    extend: {
    },
  },
  plugins: [],
}
