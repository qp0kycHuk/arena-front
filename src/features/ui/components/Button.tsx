// @flow
import * as React from 'react';
import { useRef } from 'react';
import { useRipple } from '../hooks/useRipple';
import { Color, Size } from '../types';

type Variant = 'fill' | 'light' | 'contur' | 'link'

interface IProps {
  color: Color
  size: Size
  variant: Variant
};

type ButtonProps = IProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof IProps>

const BASE_CLASSES = 'flex items-center justify-center rounded-lg px-4 ring-0 font-medium transition overflow-hidden outline-none disabled:pointer-events-none disabled:opacity-50 focus:border-transparent active:translate-y-0.5'

const SIZE_CLASSES: Record<Size, string> = {
  small: 'h-10',
  middle: 'h-12',
  large: 'h-14',
};

const COLOR_CLASSES: Record<Color, string> = {
  primary: 'ring-primary'
};

const VARIANT_CLASSES: Record<Variant, string> = {
  fill: `text-white ring-opacity-10 focus:ring-4 ripple--light active:ring-0`,
  light: `bg-opacity-20 hover:bg-opacity-30 focus:ring-2 active:ring-0`,
  contur: `ring-1 hover:bg-opacity-10 focus:ring-2 active:ring-1`,
  link: ` bg-opacity-0 focus:bg-opacity-20 hover:bg-opacity-20`,
};

const VARIANT_COLOR_CLASSES: Record<Variant, Record<Color, string>> = {
  fill: {
    primary: 'bg-primary hover:bg-primary-600'
  },
  light: {
    primary: 'text-primary bg-primary'
  },
  contur: {
    primary: 'text-primary ring-1 hover:bg-primary'
  },
  link: {
    primary: 'text-primary bg-primary'
  },
}

export function Button({ children, color, size, variant, ...props }: ButtonProps) {
  const ref = useRef(null)
  useRipple(ref)

  return (
    <button
      {...props}
      ref={ref}
      className={[
        BASE_CLASSES,
        SIZE_CLASSES[size],
        VARIANT_COLOR_CLASSES[variant][color],
        VARIANT_CLASSES[variant],
        COLOR_CLASSES[color],
        props.className
      ].join(' ')}>
      {children}
    </button >
  );
};

Button.defaultProps = {
  color: 'primary',
  size: 'middle',
  variant: 'fill',
}
