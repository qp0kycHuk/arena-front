import React from 'react'
import { Color, Size } from '../types'
import classnames from 'classnames'

interface IProps {
  color?: Color
  size?: Size
  borderless?: boolean
  className?: string
}

export type InputProps = IProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof IProps>
export type InputRef = React.ForwardedRef<HTMLInputElement>

const baseClassNames = 'rounded-lg  outline-none disabled:pointer-events-none disabled:opacity-50 '

const sizeClassNames: Record<Size, string> = {
  xsmall: 'h-7',
  small: 'h-10',
  middle: 'h-12',
  large: 'h-14',
}

export function InputComponent({ color = 'primary', size = 'middle', borderless = false, ...props }: InputProps, ref: InputRef) {
  return (
    <input
      {...props}
      ref={ref}
      className={getUnputClassNames({
        color,
        size,
        borderless,
        ...props,
      })}
    />
  )
}

export function getUnputClassNames({ color = 'primary', size = 'middle', borderless = false, className = '' }: IProps) {
  return classnames(baseClassNames, sizeClassNames[size], className, {
    ['pl-4']: !className?.includes('pl-') && !className?.includes('px-'),
    ['pr-4']: !className?.includes('pr-') && !className?.includes('px-'),
    ['bg-white dark:bg-opacity-5']: !className?.includes('bg-'),
    ['border border-black border-opacity-10 focus:ring-1']: !borderless,
    [`focus:border-${color}  focus:ring-${color}`]: !borderless,
  })
}

export const Input = React.forwardRef(InputComponent)
