import * as React from 'react'
import { Color, Size } from '../types'
import { twMerge } from 'tailwind-merge'
import { ripplePointerdownHandler } from '../utils/ripple'
import { BaseComponentProps, BaseComponent } from './Base'

const sizeClassNames: Record<Size, string> = {
  xs: 'btn-xs',
  sm: 'btn-sm',
  base: 'btn-md',
  lg: 'btn-lg',
}

const colorClassNames: PartialRecord<Color, string> = {
  primary: 'btn-primary',
  default: 'btn-default',
  gray: 'btn-gray',
  red: 'btn-red',
  green: 'btn-green',
  yellow: 'btn-yellow',
}

const variantClassNames: Record<Variant, string> = {
  fill: 'btn-fill',
  whitebg: 'btn-whitebg',
  light: 'btn-light',
  contur: 'btn-contur',
  text: '',
}

function ButtonComponent<C extends BaseComponent = 'button'>(
  {
    children,
    color = 'primary',
    size = 'base',
    variant = 'fill',
    as: ButtonTag = 'button',
    shadow = false,
    icon = false,
    ...props
  }: ButtonProps<C>,
  ref: ButtonRef
) {
  const classNames = twMerge(
    'btn',
    sizeClassNames[size],
    variantClassNames[variant],
    colorClassNames[color],
    'rounded-lg',
    shadow ? 'shadow-md' : '',
    icon ? 'btn-icon' : 'pl-4 pr-4',
    props.className
  )

  return (
    <ButtonTag
      ref={ref}
      tabIndex={0}
      type="button"
      {...props}
      onPointerDown={ripplePointerdownHandler}
      className={classNames}
    >
      {children}
    </ButtonTag>
  )
}

export const Button = React.forwardRef(ButtonComponent)

type Variant = 'fill' | 'light' | 'contur' | 'text' | 'whitebg'

interface IProps {
  color?: keyof typeof colorClassNames
  size?: keyof typeof sizeClassNames
  variant?: Variant
  shadow?: boolean
  icon?: boolean
}

export type ButtonProps<C extends BaseComponent = 'button'> = BaseComponentProps<C> & IProps
export type ButtonRef = React.ForwardedRef<HTMLElement>
