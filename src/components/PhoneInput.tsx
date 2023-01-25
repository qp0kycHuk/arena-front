import { Input, InputProps } from '@features/ui/';
import { MaskedInput } from './MaskedInput';
import { getMaskedPhoneValue, isPhoneComplete } from '@utils/index';


interface IPhoneInputProps extends InputProps {
}

export function PhoneInput({ ...props }: IPhoneInputProps) {
    return (
        <MaskedInput {...props} isComplete={isPhoneComplete} getMaskedValue={getMaskedPhoneValue} />
    );
}

PhoneInput.defaultProps = Input.defaultProps