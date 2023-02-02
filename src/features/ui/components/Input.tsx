// @flow
import * as React from 'react';
import { Color, Size } from '../types';
import classnames from 'classnames'

interface IProps {
    color: Color
    size: Size
    borderless?: boolean
};

export type InputProps = IProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof IProps>

const baseClassNames = 'rounded-lg  outline-none disabled:pointer-events-none disabled:opacity-50 '

const sizeClassNames: Record<Size, string> = {
    xsmall: 'h-7',
    small: 'h-10',
    middle: 'h-12',
    large: 'h-14',
};

export function Input({ color, size, borderless, ...props }: InputProps) {

    return (
        <input {...props}
            className={classnames(
                baseClassNames,
                sizeClassNames[size],
                props.className,
                {
                    ['pl-4']: !props.className?.includes('pl-') && !props.className?.includes('px-'),
                    ['pr-4']: !props.className?.includes('pr-') && !props.className?.includes('px-'),
                    ['bg-white dark:bg-opacity-5']: !props.className?.includes('bg-'),
                    ['border border-black border-opacity-10 focus:ring-1']: !borderless,
                    [`focus:border-${color}  focus:ring-${color}`]: !borderless
                }
            )}
        />
    );
};

Input.defaultProps = {
    color: 'primary',
    size: 'middle',
}
