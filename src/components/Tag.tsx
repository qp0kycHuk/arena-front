import * as React from 'react'
import { Button } from '@features/ui'
import { ButtonProps } from '@features/ui/components/Button'

export type ITagProps = ButtonProps

export function Tag({ children, className, ...props }: ITagProps) {
  return (
    <Button color="gray" variant="light" size="xsmall" rounded className={'px-3 ' + className} {...props}>
      <span className="flex items-center text-xs font-normal">{children}</span>
    </Button>
  )
}
