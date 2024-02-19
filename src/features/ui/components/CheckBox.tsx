import React, { ReactNode } from 'react'
import { GalOchkaIcon } from '@assets/icons/stroke'
import { Color, Size } from '../types'
import { ripplePointerdownHandler } from '../utils/ripple'
import classNames from 'classnames'

export interface ICheckBoxProps extends React.HTMLAttributes<HTMLInputElement> {
  icon: ReactNode
  label: ReactNode
  color: Color
  size: Size
}

const inputBaseClasses =
  'peer relative appearance-none  border rounded-md border-default/40 cursor-pointer transition-all '

const sizeClasses: Record<Size, string> = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  base: 'w-5 h-5',
  lg: 'w-6 h-6',
}

export function CheckBox({ icon, size, color, label, ...props }: ICheckBoxProps) {
  return (
    <label className={'inline-flex items-center group cursor-pointer ' + props.className}>
      <div className="relative flex items-center rounded-full transition group-active:translate-y-0.5">
        <input
          type="checkbox"
          {...props}
          className={[inputBaseClasses, sizeClasses[size], `checked:bg-${color} checked:border-${color}`].join(' ')}
        />
        <div className="absolute text-white transition-opacity -translate-x-1/2 -translate-y-1/2 opacity-0 pointer-events-none top-1/2 left-1/2 peer-checked:opacity-100">
          {icon}
        </div>
        <div
          onPointerDown={ripplePointerdownHandler}
          className={classNames(
            'bg-default bg-opacity-0 w-12 h-12 rounded-full absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 transition-opacity',
            'peer-checked:bg-opacity-0 peer-checked:hover:bg-opacity-10 group-hover:bg-opacity-10',
            `peer-checked:bg-${color}`
          )}
        ></div>
      </div>
      {label ? <div className="ml-3 select-none">{label}</div> : null}
    </label>
  )
}

CheckBox.defaultProps = {
  icon: <GalOchkaIcon />,
  color: 'primary',
  size: 'base',
  label: null,
}
