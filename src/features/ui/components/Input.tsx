import React from 'react'
import type { Color, Size } from '../types'
import { twMerge } from 'tailwind-merge'

const baseClassName = 'input rounded-lg '

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

export const Input = React.forwardRef(InputComponent)

export function getInputClassname({ color = 'primary', size, className }: InputProps) {
  return twMerge(baseClassName, colorClassNames[color] || null, size ? sizeClassNames[size] : null, className)
}

interface IProps {
  color?: keyof typeof colorClassNames
  size?: keyof typeof sizeClassNames
  className?: string
}

type InputProps = IProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof IProps>
type InputRef = React.ForwardedRef<HTMLInputElement>
