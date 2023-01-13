// @flow
import * as React from 'react';
import { useRef } from 'react';
import { useRipple } from '../hooks/useRipple';
import { Color, Size } from '../types';

type Variant = 'fill' | 'light' | 'contur' | 'text' | 'whitebg'
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

const baseClassNames = 'flex items-center cursor-pointer ring-0 font-medium transition overflow-hidden outline-none disabled:pointer-events-none disabled:opacity-50 focus:border-transparent active:translate-y-0.5'

const sizeClassNames: Record<Size, string> = {
  xsmall: 'h-7',
  small: 'h-[38px]',
  middle: 'h-12',
  large: 'h-14',
};

const iconSizeClassNames: Record<Size, string> = {
  xsmall: 'min-w-7 w-7',
  small: 'min-w-[38px] w-[38px]',
  middle: 'min-w-12 w-12',
  large: 'min-w-14 w-14',
};

const colorClassNames: PartialRecord<Color, string> = {
  gray: 'dark:text-white focus:ring-primary focus:border-primary',
};

const variantClassNames: Record<Variant, string> = {
  fill: `text-white ring-opacity-10 focus:ring-4 ripple--light active:ring-0`,
  whitebg: `bg-white hover:bg-gray-50  dark:bg-gray-900 dark:hover:bg-gray-800 ring-0 focus:ring-1 active:ring-0`,
  light: `bg-opacity-20 hover:bg-opacity-30 focus:ring-2 active:ring-0`,
  contur: `border border-opacity-30 ring-0 hover:bg-opacity-10 focus:ring-1 active:ring-0`,
  text: `bg-opacity-0 focus:bg-opacity-10 focus:ring-1 active:ring-0 hover:bg-opacity-10`,
};



export function Button({ children, color, size, variant, rounded, shadow, icon, tagName, ...props }: ButtonProps) {
  const ref = useRef(null)
  useRipple(ref)

  const variantColorClassNames: Record<Variant, string> = {
    fill: `bg-${color} hover:bg-${color}-600`,
    whitebg: `text-${color}`,
    light: `text-${color} bg-${color}`,
    contur: `text-${color} border-${color} hover:bg-${color}`,
    text: `text-${color} bg-${color}`,
  }

  const extraClassNames = [
    rounded ? 'rounded-full' : 'rounded-lg',
    shadow ? 'shadow-md' : '',
    icon ? iconSizeClassNames[size] : '',
    (icon || props.className?.includes('px-')) ? '' : props.className?.includes('pl-') ? '' : 'pl-4',
    (icon || props.className?.includes('px-')) ? '' : props.className?.includes('pr-') ? '' : 'pr-4',
    props.className?.includes('justify-') ? '' : 'justify-center',
    `ring-${color}`

  ].join(' ')

  const ButtonTag = tagName

  return (
    <ButtonTag
      tabIndex={0}
      {...props}
      ref={ref}
      className={[
        baseClassNames,
        sizeClassNames[size],
        variantColorClassNames[variant],
        variantClassNames[variant],
        colorClassNames[color],
        extraClassNames,
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
