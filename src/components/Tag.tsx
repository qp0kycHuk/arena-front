import { Button } from '@features/ui';
import { ButtonProps } from '@features/ui/components/Button';
import * as React from 'react';

export interface ITagProps extends ButtonProps {
}

export function Tag({ children, className, ...props }: ITagProps) {
  return (
    <Button color='gray' variant='light' size='xsmall' rounded className={'px-3 ' + className} {...props}>
      <span className="text-xs font-normal flex items-center">{children}</span>
    </Button>
  );
}
