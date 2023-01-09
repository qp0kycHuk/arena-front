// @flow
import * as React from 'react';
import { Color, Size } from '../types';


interface IProps {
    color: Color
    size: Size
};

type InputProps = IProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof IProps>


const BASE_CLASSES = 'rounded-lg border border-black border-opacity-10 outline-none disabled:pointer-events-none disabled:opacity-50 focus:ring-1'

const SIZE_CLASSES: Record<Size, string> = {
    xsmall: 'h-7',
    small: 'h-10',
    middle: 'h-12',
    large: 'h-14',
};



export function Input({ color, size, ...props }: InputProps) {
    const extraClasses = [
        props.className?.includes('px-') ? '' : props.className?.includes('pl-') ? '' : 'pl-4',
        props.className?.includes('px-') ? '' : props.className?.includes('pr-') ? '' : 'pr-4',
        props.className?.includes('bg-') ? '' : 'bg-white dark:bg-opacity-5',
        `focus:border-${color}  focus:ring-${color}`
    ].join(' ')

    return (
        <input {...props}
            className={[
                BASE_CLASSES,
                SIZE_CLASSES[size],
                extraClasses,
                props.className
            ].join(' ')}
        />
    );
};

Input.defaultProps = {
    color: 'primary',
    size: 'middle',
}
