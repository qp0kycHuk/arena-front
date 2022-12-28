import { Button } from '@features/ui';
import * as React from 'react';

export interface ITagProps extends React.PropsWithChildren {
}

export function Tag({ children }: ITagProps) {
  return (
    <Button color='gray' variant='light' size='xsmall' rounded className='px-3'>
      <span className="text-xs font-normal">{children}</span>
    </Button>
  );
}
