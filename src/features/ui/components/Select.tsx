import React from 'react'
import { Color, Size } from '../types'
import { getInputClassname } from './Input'
import { ToRightIcon } from '@assets/icons/stroke'

interface IProps {
  color?: Color
  size?: Size
}

export type InputProps = IProps & Omit<React.InputHTMLAttributes<HTMLSelectElement>, keyof IProps>
export type InputRef = React.ForwardedRef<HTMLSelectElement>

export function SelectComponent({ color = 'primary', size = 'base', children, ...props }: InputProps, ref: InputRef) {
  return (
    <div className="relative">
      <select
        {...props}
        ref={ref}
        className={
          'appearance-none w-full ' +
          getInputClassname({
            color,
            size,
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
