import { Input, InputProps } from '@features/ui/';
import { MaskedInput } from './MaskedInput';

interface IPhoneInputProps extends InputProps {
}

const phoneRegexp = /(7|8)?(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/
const phoneCompleteRegexp = /(7|8)\d{10}$/

function getMaskedValue(value: string): string {
    const numberValue = value.replace(/\D/g, '')

    if (!numberValue) {
        return ''
    }

    const matchValue = numberValue.match(phoneRegexp);


    if (!matchValue) {
        return ''
    }

    const maskedValue =
        `+7 (${matchValue[2]}${matchValue[3] ? `) ${matchValue[3]}` : ''
        }${matchValue[4] ? ` - ${matchValue[4]}` : ''
        }${matchValue[5] ? ` - ${matchValue[5]}` : ''}`;

    return maskedValue
}

function isComplete(value: string): boolean {
    const numberValue = value.replace(/\D/g, '')
    console.log(numberValue);

    return phoneCompleteRegexp.test(numberValue)
}

export function PhoneInput({ ...props }: IPhoneInputProps) {
    return (
        <MaskedInput {...props} isComplete={isComplete} getMaskedValue={getMaskedValue} />
    );
}

PhoneInput.defaultProps = Input.defaultProps