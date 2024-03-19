import * as React from 'react'
import { Button } from '@features/ui'
import { ButtonProps } from '@features/ui/components/Button'
import { twMerge } from 'tailwind-merge'

export type ITagProps = ButtonProps & { active?: boolean }

export function Tag({ children, className, active, ...props }: ITagProps) {
  return (
    <Button
      color={active ? 'primary' : 'default'}
      variant={active ? 'fill' : 'light'}
      size="xs"
      className={twMerge('px-3 max-w-full rounded-full ', className)}
      {...props}
    >
      <span className="flex items-center text-xs font-normal truncate">{children}</span>
    </Button>
  )
}

export function TagPlaceholder({ className, ...props }: ITagProps) {
  return (
    <Button
      color="default"
      variant="light"
      size="xs"
      className={twMerge('px-3 h-7 w-16 animate-pulse rounded-full', className)}
      {...props}
    />
  )
}
