// @flow
import * as React from 'react';
import { Color, Size } from '../types';
import InputMask, { Props as InputMaskProps } from 'react-input-mask';

interface IProps {
    color: Color
    size: Size

};

type InputProps = IProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof IProps>
type MaskedInputProps = IProps & Omit<InputMaskProps, keyof IProps> & { mask: string | (string | RegExp)[] }

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

export function MaskedInput({ color, size, mask, ...props }: MaskedInputProps) {
    const extraClassNames = [
        props.className?.includes('px-') ? '' : props.className?.includes('pl-') ? '' : 'pl-4',
        props.className?.includes('px-') ? '' : props.className?.includes('pr-') ? '' : 'pr-4',
        props.className?.includes('bg-') ? '' : 'bg-white dark:bg-opacity-5',
        `focus:border-${color}  focus:ring-${color}`
    ].join(' ')

    return (
        <InputMask mask={mask} {...props}
            className={[
                baseClassNames,
                sizeClassNames[size],
                extraClassNames,
                props.className
            ].join(' ')}
        />
    );
};


Input.defaultProps = MaskedInput.defaultProps = {
    color: 'primary',
    size: 'middle',
}
