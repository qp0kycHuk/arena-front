// @flow
import * as React from 'react';
import { Color, Size } from '../types';


interface IProps {
    color: Color
    size: Size
};

type InputProps = IProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof IProps>


const BASE_CLASSES = 'rounded-lg bg-white px-4 border border-black border-opacity-10 outline-none disabled:pointer-events-none disabled:opacity-50 '


const SIZE_CLASSES: Record<Size, string> = {
    small: 'h-10',
    middle: 'h-12',
    large: 'h-14',
};

export const Input = ({ children, color, size, ...props }: InputProps) => {

    const FOCUS_CLASSES = `focus:border-${color} focus:ring-1 focus:ring-${color}`

    return (
        <input {...props}
            className={`${BASE_CLASSES} ${FOCUS_CLASSES} ${SIZE_CLASSES[size]} ${props.className}`}
        />
    );
};

Input.defaultProps = {
    color: 'primary',
    size: 'middle',
}
