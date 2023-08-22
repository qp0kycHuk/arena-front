import React from 'react'
import { Button } from '@features/ui'
import { ButtonProps } from '@features/ui/components/Button'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean
}

type IMenuButtonProps = ButtonProps & Props

export function MenuButton({ children, isActive, ...props }: IMenuButtonProps) {
  return (
    <Button {...props} className={'px-2 ' + props.className} size="sm" color={isActive ? 'primary' : 'gray'} variant={isActive ? 'light' : 'text'}>
      {children}
    </Button>
  )
}

MenuButton.defaultProps = Button.defaultProps
