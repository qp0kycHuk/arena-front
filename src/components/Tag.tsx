import * as React from 'react'
import { Button } from '@features/ui'
import { ButtonProps } from '@features/ui/components/Button'

export type ITagProps = ButtonProps & { active?: boolean }

export function Tag({ children, className, active, ...props }: ITagProps) {
  return (
    <Button
      color={active ? 'primary' : 'gray'}
      variant={active ? 'fill' : 'light'}
      size="xs"
      rounded
      className={'px-3 max-w-full ' + className}
      {...props}
    >
      <span className="flex items-center text-xs font-normal truncate">{children}</span>
    </Button>
  )
}

export function TagPlaceholder({ className, ...props }: ITagProps) {
  return (
    <Button
      color="gray"
      variant="light"
      size="xs"
      rounded
      className={'px-3 h-7 w-16 animate-pulse ' + className}
      {...props}
    />
  )
}
