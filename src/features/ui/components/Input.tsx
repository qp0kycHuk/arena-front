import React from 'react'
import classnames from 'classnames'
import type { Color, Size } from '../types'

const baseClassName = 'input rounded-lg bg-transparent'

const colorClassNames: PartialRecord<Color, string> = {
  white: 'input-white',
  black: 'input-black',
  green: 'input-green',
  yellow: 'input-yellow',
  primary: 'input-primary',
  red: 'input-red',
  gray: 'input-gray',
}

const sizeClassNames: PartialRecord<Size, string> = {
  xs: 'input-xs',
  sm: 'input-sm',
  base: 'input-base',
  lg: 'input-lg',
}

function InputComponent({ color = 'primary', size, type = 'text', className, ...props }: InputProps, ref: InputRef) {
  const classNames = getInputClassname({ color, size, className })

  return <input placeholder="" {...props} type={type} ref={ref} className={classNames} />
}

export function getInputClassname({ color = 'primary', size, className }: InputProps) {
  return classnames(baseClassName, color ? colorClassNames[color] : null, size ? sizeClassNames[size] : null, className)
}

export const Input = React.forwardRef(InputComponent)

export interface IProps {
  color?: keyof typeof colorClassNames
  size?: keyof typeof sizeClassNames
  className?: string
}

export type InputProps = IProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof IProps>
export type InputRef = React.ForwardedRef<HTMLInputElement>
