import { GalOchkaIcon } from '@assets/icons/stroke';
import * as React from 'react';
import { ReactNode, useRef } from 'react';
import { Color, Size } from '../types';
import { ripplePointerdownHandler } from '../utils/ripple';

export interface ICheckBoxProps extends React.HTMLAttributes<HTMLInputElement> {
  icon: ReactNode
  label: ReactNode
  color: Color
  size: Size,
}

const inputBaseClasses = 'peer relative appearance-none  border rounded-md border-gray-300 cursor-pointer transition-all '

const sizeClasses: Record<Size, string> = {
  xsmall: 'w-3 h-3',
  small: 'w-4 h-4',
  middle: 'w-5 h-5',
  large: 'w-6 h-6',
};

export function CheckBox({ icon, size, color, label, ...props }: ICheckBoxProps) {

  return (
    <label className={"inline-flex items-center group cursor-pointer " + props.className} >
      <div className="relative flex items-center rounded-full transition group-active:translate-y-0.5">
        <input type="checkbox"
          {...props}
          className={[
            inputBaseClasses,
            sizeClasses[size],
            `checked:bg-${color} checked:border-${color}`
          ].join(' ')}
        />
        <div className="absolute text-white transition-opacity -translate-x-1/2 -translate-y-1/2 opacity-0 pointer-events-none top-1/2 left-1/2 peer-checked:opacity-100">
          {icon}
        </div>
        <div onPointerDown={ripplePointerdownHandler} className={`bg-gray bg-opacity-0 group-hover:bg-opacity-10 peer-checked:bg-opacity-0 peer-checked:hover:bg-opacity-10 peer-checked:bg-${color} w-12 h-12 rounded-full absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 transition-opacity`}></div>
      </div>
      {label ? <div className="ml-3 select-none">{label}</div> : null}
    </label>
  );
}

CheckBox.defaultProps = {
  icon: <GalOchkaIcon />,
  color: 'primary',
  size: 'middle',
  label: null
}