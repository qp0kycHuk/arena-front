import { Input, InputProps } from '@features/ui/';
import * as React from 'react';

interface IMaskedInputProps extends InputProps {
    getMaskedValue: (s: string) => string
    isComplete: (s: string) => boolean
}

export function MaskedInput({ getMaskedValue, isComplete, onChange, onBlur, value, ...props }: IMaskedInputProps) {

    function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        const maskedValue = getMaskedValue(event.currentTarget.value)
        event.currentTarget.value = maskedValue

        onChange?.(event);
    }

    function blurHandler(event: React.FocusEvent<HTMLInputElement>) {
        if (!isComplete(event.currentTarget.value)) {
            event.currentTarget.value = ''
            onChange?.(event);
        }
        onBlur?.(event);
    }

    return (
        <Input defaultValue={getMaskedValue(value?.toString() || '')} {...props} onChange={changeHandler} onBlur={blurHandler} />
    );
}

MaskedInput.defaultProps = Input.defaultProps