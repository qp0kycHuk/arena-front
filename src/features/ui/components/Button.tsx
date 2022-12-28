// @flow
import * as React from 'react';
import { useRef } from 'react';
import { useRipple } from '../hooks/useRipple';
import { Color, Size } from '../types';

type Variant = 'fill' | 'light' | 'contur' | 'simple'

interface IProps {
  color: Color
  size: Size
  variant: Variant
  rounded: boolean
  shadow: boolean
};

type ButtonProps = IProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof IProps>

const baseClasses = 'flex items-center justify-center  ring-0 font-medium transition overflow-hidden outline-none disabled:pointer-events-none disabled:opacity-50 focus:border-transparent active:translate-y-0.5'

const sizeClasses: Record<Size, string> = {
  xsmall: 'h-7',
  small: 'h-10',
  middle: 'h-12',
  large: 'h-14',
};

const colorClasses: Record<Color, string> = {
  primary: 'ring-primary',
  gray: 'ring-gray focus:ring-primary',
};

const variantClasses: Record<Variant, string> = {
  fill: `text-white ring-opacity-10 focus:ring-4 ripple--light active:ring-0`,
  light: `bg-opacity-20 hover:bg-opacity-30 focus:ring-2 active:ring-0`,
  contur: `border border-opacity-30 ring-0 hover:bg-opacity-10 focus:ring-1 active:ring-0`,
  simple: `bg-opacity-0 focus:bg-opacity-10 focus:ring-1 active:ring-0 hover:bg-opacity-10`,
};

const variantColorClasses: Record<Variant, Record<Color, string>> = {
  fill: {
    primary: 'bg-primary hover:bg-primary-600',
    gray: 'bg-gray hover:bg-gray-600',
  },
  light: {
    primary: 'text-primary bg-primary',
    gray: 'text-gray dark:text-white  bg-gray',
  },
  contur: {
    primary: 'text-primary border-primary hover:bg-primary',
    gray: 'text-gray dark:text-white border-gray focus:border-primary hover:bg-gray',
  },
  simple: {
    primary: 'text-primary bg-primary',
    gray: 'text-gray dark:text-white bg-gray',
  },
}

export function Button({ children, color, size, variant, rounded, shadow, ...props }: ButtonProps) {
  const ref = useRef(null)
  useRipple(ref)
  console.log(props.className?.includes('px-'));

  const extraClasses = [
    rounded ? 'rounded-full' : 'rounded-lg',
    shadow ? 'shadow-md' : '',
    props.className?.includes('px-') ? '' : props.className?.includes('pl-') ? '' : 'pl-4',
    props.className?.includes('px-') ? '' : props.className?.includes('pr-') ? '' : 'pr-4',

  ].join(' ')

  return (
    <button
      {...props}
      ref={ref}
      className={[
        baseClasses,
        sizeClasses[size],
        variantColorClasses[variant][color],
        variantClasses[variant],
        colorClasses[color],
        extraClasses,
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
  rounded: false,
  shadow: false,
}
