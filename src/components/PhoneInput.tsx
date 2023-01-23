import { Input, InputProps } from '@features/ui/';
import { MaskedInput } from './MaskedInput';
import { getMaskedValue, isComplete } from '@utils/phoneMaskUtils';

interface IPhoneInputProps extends InputProps {
}

export function PhoneInput({ ...props }: IPhoneInputProps) {
    return (
        <MaskedInput {...props} isComplete={isComplete} getMaskedValue={getMaskedValue} />
    );
}

PhoneInput.defaultProps = Input.defaultProps