export const colors = {
  primary: withOpacity('--primary-rgb'),
  blue: withOpacity('--blue-rgb'),
  red: withOpacity('--red-rgb'),
  green: withOpacity('--green-rgb'),
  yellow: withOpacity('--yellow-rgb'),
  white: withOpacity('--white-rgb'),
  black: withOpacity('--black-rgb'),
  l1: withOpacity('--bg1-rgb'),
  l2: withOpacity('--bg2-rgb'),
  l3: withOpacity('--bg3-rgb'),
  default: withOpacity('--default-rgb'),
  gray: withOpacity('--gray-rgb'),
}

export const elementsSizes = {
  xs: '28px',
  sm: '38px',
  base: '48px',
  lg: '54px',
}

export const container = {
  xs: 420 + 29.98 + 'px',
  sm: 580 + 29.98 + 'px',
  md: 720 + 29.98 + 'px',
  lg: 1170 + 29.98 + 'px',
}

export const screens = {
  xs: 420 + 'px',
  sm: 580 + 'px',
  md: 720 + 'px',
  lg: 1170 + 'px',
  xl: 1366 + 'px',
}

export const ui = {
  colors,
  elementsSizes,
  btnSize: elementsSizes,
  inputSize: elementsSizes,
  screens,
  container,
}

function withOpacity(variableName: string) {
  return ({ opacityValue }: { opacityValue?: string }) => {
    if (opacityValue !== undefined) {
      return 'rgba(var(' + variableName + '), ' + opacityValue + ')'
    }

    return 'rgba(var(' + variableName + '), 1)'
  }
}
