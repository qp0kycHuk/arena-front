const phoneRegexp = /(7|8)?(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/
const phoneCompleteRegexp = /(7|8)\d{10}$/

export function getUnmaskedPhoneValue(value: string): string {
    return value.replace(/\D/g, '')
}

export function getMaskedPhoneValue(value: string | number = ''): string {
    const numberValue = value.toString().replace(/\D/g, '')

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

export function isPhoneComplete(value: string): boolean {
    const numberValue = value.replace(/\D/g, '')
    console.log(numberValue);

    return phoneCompleteRegexp.test(numberValue)
}