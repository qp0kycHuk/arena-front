// @flow
import * as React from 'react';
import { Color, Size } from '../types';
import { ripplePointerdownHandler } from '../utils/ripple';

type Variant = 'fill' | 'light' | 'contur' | 'text' | 'whitebg'

interface IProps {
  color?: Color
  size?: Size
  variant?: Variant
  as?: React.ElementType
  rounded?: boolean
  shadow?: boolean
  icon?: boolean
};

export type ButtonProps = IProps & Omit<React.ButtonHTMLAttributes<HTMLElement>, keyof IProps>
export type ButtonRef = React.ForwardedRef<HTMLElement>

const baseClassNames = 'btn'

const sizeClassNames: Record<Size, string> = {
  xsmall: 'btn-xs',
  small: 'btn-sm',
  middle: 'btn-md',
  large: 'btn-lg',
};


const colorClassNames: PartialRecord<Color, string> = {
  primary:'btn-primary',
  gray:'btn-gray',
  red:'btn-red',
  green:'btn-green',
  yellow:'btn-yellow',
};

const variantClassNames: Record<Variant, string> = {
  fill: `btn-fill`,
  whitebg: `btn-whitebg`,
  light: `btn-light`,
  contur: `btn-contur`,
  text: ``,
};


// It is render function for React.forwardRef
function ButtonComponent({
  children,
  color = 'primary',
  size = 'middle',
  variant = 'fill',
  as: ButtonTag = 'button',
  rounded = false,
  shadow = false,
  icon = false,
  ...props }: ButtonProps, ref: ButtonRef) {

  const classNames = [
    baseClassNames,
        sizeClassNames[size],
        variantClassNames[variant],
        colorClassNames[color],
    rounded ? 'rounded-full' : 'rounded-lg',
    shadow ? 'shadow-md' : '',
    icon ? 'btn-icon' : '',
    (icon || props.className?.includes('px-')) ? '' : props.className?.includes('pl-') ? '' : 'pl-4',
    (icon || props.className?.includes('px-')) ? '' : props.className?.includes('pr-') ? '' : 'pr-4',
    props.className?.includes('justify-') ? '' : 'justify-center',
    props.className


  ].join(' ')

  return (
    <ButtonTag
      ref={ref}
      tabIndex={0}
      type="button"
      {...props}
      onPointerDown={ripplePointerdownHandler}
      className={classNames}>
      {children}
    </ButtonTag >
  );
};



export const Button = React.forwardRef(ButtonComponent)
