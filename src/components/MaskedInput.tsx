import { Input, InputProps } from '@features/ui/';
import * as React from 'react';

interface IMaskedInputProps extends InputProps {
    getMaskedValue: (s: string) => string
    isComplete: (s: string) => boolean
}

export function MaskedInput({ getMaskedValue, isComplete, onChange, onBlur, ...props }: IMaskedInputProps) {
    function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        const maskedValue = getMaskedValue(event.currentTarget.value)
        event.currentTarget.value = maskedValue

        onChange?.(event);
    }

    function blurHandler(event: React.FocusEvent<HTMLInputElement>) {
        if (!isComplete(event.currentTarget.value)) {
            event.currentTarget.value = ''
        }
        onBlur?.(event);
    }

    return (
        <Input {...props} onChange={changeHandler} onBlur={blurHandler} />
    );
}

MaskedInput.defaultProps = Input.defaultProps