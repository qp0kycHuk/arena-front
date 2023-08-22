export const colors = {
  white: '#fff',
  black: '#222',
  transparent: 'rgba(0,0,0,0)',
  green: {
    50: '#f2faf5',
    100: '#e6f4eb',
    200: '#bfe4cc',
    300: '#99d4ad',
    400: '#4db470',
    500: '#009432',
    600: '#00852d',
    700: '#006f26',
    800: '#00591e',
    900: '#004919',
    DEFAULT: '#009432',
  },
  yellow: {
    50: '#fffaf4',
    100: '#fef5e9',
    200: '#fde7c7',
    300: '#fcd9a5',
    400: '#f9bc62',
    500: '#f79f1f',
    600: '#de8f1c',
    700: '#b97717',
    800: '#945f13',
    900: '#794e0f',
    DEFAULT: '#f79f1f',
  },
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
    DEFAULT: '#199afc',
  },
  red: {
    50: '#fdf5f5',
    100: '#fbeaea',
    200: '#f5cbcc',
    300: '#efacad',
    400: '#e26e6f',
    500: '#d63031',
    600: '#c12b2c',
    700: '#a12425',
    800: '#801d1d',
    900: '#611010',
    DEFAULT: '#d63031',
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
    DEFAULT: '#6a707e',
  },
}

export const elementsSizes = {
  xs: '28px',
  sm: '38px',
  base: '48px',
  lg: '54px',
}

export const screens = {
  xs: 420 + 29.98 + 'px',
  sm: 580 + 29.98 + 'px',
  md: 720 + 29.98 + 'px',
  lg: 1170 + 29.98 + 'px',
}

export const container = {
  xs: 420 + 'px',
  sm: 580 + 'px',
  md: 720 + 'px',
  lg: 1366 + 'px',
}

export const ui = {
  colors,
  elementsSizes,
  btnSize: elementsSizes,
  inputSize: elementsSizes,
  screens,
  container,
}
