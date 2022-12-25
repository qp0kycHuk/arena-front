// @flow
import * as React from 'react';
import { useRef } from 'react';
import { useRipple } from '../../hooks/useRipple';

enum Color { PRIMARY }
enum Size { LARGE, MIDDLE, SMALL, }

interface IProps {
  color: Color
  size: Size
};

type ButtonProps = IProps & Omit<React.HTMLAttributes<HTMLButtonElement>, keyof IProps>

const BASE_CLASSES = 'flex items-center justify-center rounded-lg px-4 ring-0 font-medium transition active:translate-y-0.5 overflow-hidden'

const SIZE_CLASSES: Record<Size, string> = {
  [Size.SMALL]: 'h-10',
  [Size.LARGE]: 'h-14',
  [Size.MIDDLE]: 'h-12',
};

const COLOR_CLASSES: Record<Color, string> = {
  [Color.PRIMARY]: 'bg-primary hover:bg-primary-600 ring-primary',
};

export const Button = ({ children, color, size, ...props }: ButtonProps) => {
  const ref = useRef(null)
  const ripple = useRipple(ref)
  
  return (
    <button ref={ref} {...props}
      className={` ${BASE_CLASSES} ${SIZE_CLASSES[size]} ${COLOR_CLASSES[color]} 
      focus:ring-4 focus:ring-opacity-20 focus:border-transparent
      active:ring-0 text-white`}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  color: Color.PRIMARY,
  size: Size.MIDDLE,
}

Button.color = Color;
Button.size = Size;