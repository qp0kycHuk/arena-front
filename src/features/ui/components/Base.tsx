import React from 'react'
import { Attributes, createElement, ComponentType, ComponentPropsWithRef } from 'react'

export type BaseComponent = keyof JSX.IntrinsicElements | ComponentType<any>

type BaseProps<C extends BaseComponent = 'div'> = {
  as?: C
} & Attributes

export type BaseComponentProps<C extends BaseComponent = 'div'> =
  C extends keyof JSX.IntrinsicElements
    ? Omit<ComponentPropsWithRef<C>, keyof BaseProps<C>> & BaseProps<C>
    : C extends ComponentType<infer P>
    ? P extends ComponentPropsWithRef<any>
      ? Omit<P, keyof BaseProps<C>> & BaseProps<C>
      : never
    : never

function Base<C extends BaseComponent = 'div'>(
  { as = 'div', children, ...props }: BaseComponentProps<C>,
  ref: BaseRef<C>
) {
  return createElement(as, { ...props, ref }, children)
}

type BaseRef<C> = React.ForwardedRef<C>
const BaseWithRef = React.forwardRef(Base)
export default BaseWithRef as <C extends BaseComponent = 'div'>(
  { as, children, ...props }: BaseComponentProps<C>,
  ref: BaseRef<C>
) => ReturnType<typeof Base>
