// @flow
import * as React from 'react';
import { FC, useRef } from 'react';
import { useRipple } from '../hooks/useRipple';
import { Color, Size } from '../types';

type Variant = 'fill' | 'light' | 'contur' | 'link'

interface IProps {
  color: Color
  size: Size
  variant: Variant
};

type ButtonProps = IProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof IProps>

const BASE_CLASSES = 'flex items-center justify-center rounded-lg px-4 ring-0 font-medium transition overflow-hidden outline-none disabled:pointer-events-none disabled:opacity-50'
const FOCUS_CLASSES = 'focus:border-transparent'
const ACTIVE_CLASSES = 'active:translate-y-0.5'

const SIZE_CLASSES: Record<Size, string> = {
  small: 'h-10',
  middle: 'h-12',
  large: 'h-14',
};



export const Button = ({ children, color, size, variant, ...props }: ButtonProps) => {
  const ref = useRef(null)
  const ripple = useRipple(ref)


  const COLOR_CLASSES = `ring-${color}`;

  const VARIANT_CLASSES: Record<Variant, string> = {
    fill: `text-white bg-${color} hover:bg-${color}-600 ring-opacity-10 focus:ring-4 ripple--light active:ring-0`,
    light: `text-${color} bg-${color} bg-opacity-20 hover:bg-opacity-30 focus:ring-2 active:ring-0`,
    contur: `text-${color} ring-1 hover:bg-${color} hover:bg-opacity-10 focus:ring-2 active:ring-1`,
    link: `text-${color} bg-${color} bg-opacity-0 focus:bg-opacity-20 hover:bg-opacity-20`,
  };

  return (
    <button
      {...props}
      ref={ref}
      className={`${BASE_CLASSES} ${FOCUS_CLASSES} ${ACTIVE_CLASSES} ${SIZE_CLASSES[size]} ${VARIANT_CLASSES[variant]} ${COLOR_CLASSES} ${props.className}`}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  color: 'primary',
  size: 'middle',
  variant: 'fill',
}
