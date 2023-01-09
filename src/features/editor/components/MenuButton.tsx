import { Button } from '@features/ui';
import * as React from 'react';

export interface IMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isActive?: boolean
}

export function MenuButton({ children, isActive, ...props }: IMenuButtonProps) {
    return (
        <Button
            {...props}
            size='small'
            color={isActive ? 'primary' : 'gray'}
            variant={isActive ? 'light' : 'simple'} >
            {children}
        </Button>
    );
}
