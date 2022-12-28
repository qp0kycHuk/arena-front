// @flow
import * as React from 'react';
import { Color, Size } from '../types';


interface IProps {
    color: Color
    size: Size
};

type InputProps = IProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof IProps>


const BASE_CLASSES = 'rounded-lg bg-white dark:bg-opacity-5 px-4 border border-black border-opacity-10 outline-none disabled:pointer-events-none disabled:opacity-50 focus:ring-1'

const SIZE_CLASSES: Record<Size, string> = {
    xsmall: 'h-7',
    small: 'h-10',
    middle: 'h-12',
    large: 'h-14',
};

const COLOR_CLASSES: Record<Color, string> = {
    primary: 'focus:border-primary  focus:ring-primary',
    gray: 'focus:border-gray  focus:ring-gray',
};

export function Input({ color, size, ...props }: InputProps) {

    return (
        <input {...props}
            className={[
                BASE_CLASSES,
                COLOR_CLASSES[color],
                SIZE_CLASSES[size],
                props.className
            ].join(' ')}
        />
    );
};

Input.defaultProps = {
    color: 'primary',
    size: 'middle',
}
