// @flow
import * as React from 'react';
import { Color, Size } from '../types';

interface IProps {
    color: Color
    size: Size

};

export type InputProps = IProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof IProps>

const baseClassNames = 'rounded-lg border border-black border-opacity-10 outline-none disabled:pointer-events-none disabled:opacity-50 focus:ring-1'

const sizeClassNames: Record<Size, string> = {
    xsmall: 'h-7',
    small: 'h-10',
    middle: 'h-12',
    large: 'h-14',
};

export function Input({ color, size, ...props }: InputProps) {
    const extraClassNames = [
        props.className?.includes('px-') ? '' : props.className?.includes('pl-') ? '' : 'pl-4',
        props.className?.includes('px-') ? '' : props.className?.includes('pr-') ? '' : 'pr-4',
        props.className?.includes('bg-') ? '' : 'bg-white dark:bg-opacity-5',
        `focus:border-${color}  focus:ring-${color}`
    ].join(' ')

    return (
        <input {...props}
            className={[
                baseClassNames,
                sizeClassNames[size],
                extraClassNames,
                props.className
            ].join(' ')}
        />
    );
};

Input.defaultProps = {
    color: 'primary',
    size: 'middle',
}
