// @flow
import * as React from 'react';
import { useRef } from 'react';
import { useRipple } from '../hooks/useRipple';
import { Color, Size } from '../types';

type Variant = 'fill' | 'light' | 'contur' | 'text' | 'white-bg'
type Tag = 'button' | 'div' | 'label'

interface IProps {
  color: Color
  size: Size
  variant: Variant
  tagName: Tag
  rounded: boolean
  shadow: boolean
  icon: boolean
};

export type ButtonProps = IProps & Omit<React.ButtonHTMLAttributes<HTMLElement>, keyof IProps>

const baseClasses = 'flex items-center ring-0 font-medium transition overflow-hidden outline-none disabled:pointer-events-none disabled:opacity-50 focus:border-transparent active:translate-y-0.5'

const sizeClasses: Record<Size, string> = {
  xsmall: 'h-7',
  small: 'h-[38px]',
  middle: 'h-12',
  large: 'h-14',
};

const iconSizeClasses: Record<Size, string> = {
  xsmall: 'w-7',
  small: 'w-[38px]',
  middle: 'w-12',
  large: 'w-14',
};

const colorClasses: PartialRecord<Color, string> = {
  gray: 'dark:text-white focus:ring-primary focus:border-primary',
};

const variantClasses: Record<Variant, string> = {
  fill: `text-white ring-opacity-10 focus:ring-4 ripple--light active:ring-0`,
  ['white-bg']: `bg-white hover:bg-gray-50 dark:bg-black ring-0 focus:ring-1 active:ring-0`,
  light: `bg-opacity-20 hover:bg-opacity-30 focus:ring-2 active:ring-0`,
  contur: `border border-opacity-30 ring-0 hover:bg-opacity-10 focus:ring-1 active:ring-0`,
  text: `bg-opacity-0 focus:bg-opacity-10 focus:ring-1 active:ring-0 hover:bg-opacity-10`,
};



export function Button({ children, color, size, variant, rounded, shadow, icon, tagName, ...props }: ButtonProps) {
  const ref = useRef(null)
  useRipple(ref)

  const variantColorClasses: Record<Variant, string> = {
    fill: `bg-${color} hover:bg-${color}-600`,
    ['white-bg']: `text-${color}`,
    light: `text-${color} bg-${color}`,
    contur: `text-${color} border-${color} hover:bg-${color}`,
    text: `text-${color} bg-${color}`,
  }

  const extraClasses = [
    rounded ? 'rounded-full' : 'rounded-lg',
    shadow ? 'shadow-md' : '',
    icon ? iconSizeClasses[size] : '',
    (icon || props.className?.includes('px-')) ? '' : props.className?.includes('pl-') ? '' : 'pl-4',
    (icon || props.className?.includes('px-')) ? '' : props.className?.includes('pr-') ? '' : 'pr-4',
    props.className?.includes('justify-') ? '' : 'justify-center',
    `ring-${color}`

  ].join(' ')

  const ButtonTag = tagName

  return (
    <ButtonTag
      {...props}
      ref={ref}
      className={[
        baseClasses,
        sizeClasses[size],
        variantColorClasses[variant],
        variantClasses[variant],
        colorClasses[color],
        extraClasses,
        props.className
      ].join(' ')}>
      {children}
    </ButtonTag >
  );
};

Button.defaultProps = {
  color: 'primary',
  size: 'middle',
  variant: 'fill',
  tagName: 'button',
  rounded: false,
  shadow: false,
  icon: false,
}
