/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      white: "#fff",
      black: "#222",
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
      gray: {
        50: '#f8f8f9',
        100: '#f0f1f2',
        200: '#dadbdf',
        300: '#c3c6cb',
        400: '#979ba5',
        500: '#6a707e',
        600: '#5f6571',
        700: '#50545f',
        800: '#40434c',
        900: '#34373e',
        DEFAULT: '#6a707e'
      }
    },

    extend: {
      theme: {
        boxShadow: {
          md: '0px 10px 16px rgba(0, 0, 0, 0.06), 0px 2px 4px rgba(0, 0, 0, 0.06)'
        }
      }
    },
  },
  plugins: [],
}
