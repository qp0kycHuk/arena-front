import React from 'react'
import { Color, Size } from '../types'
import { getUnputClassNames } from './Input'
import { ToRightIcon } from '@assets/icons/stroke'

interface IProps {
  color?: Color
  size?: Size
  borderless?: boolean
}

export type InputProps = IProps & Omit<React.InputHTMLAttributes<HTMLSelectElement>, keyof IProps>
export type InputRef = React.ForwardedRef<HTMLSelectElement>

export function SelectComponent({ color = 'primary', size = 'middle', borderless = false, children, ...props }: InputProps, ref: InputRef) {
  return (
    <div className="relative">
      <select
        {...props}
        ref={ref}
        className={
          'appearance-none ' +
          getUnputClassNames({
            color,
            size,
            borderless,
            ...props,
          })
        }
      >
        {children}
      </select>
      <div className="absolute -translate-y-1/2 pointer-events-none right-2 top-1/2">
        <ToRightIcon className="text-gray" />
      </div>
    </div>
  )
}

export const Select = React.forwardRef(SelectComponent)
