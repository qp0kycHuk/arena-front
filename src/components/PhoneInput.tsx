import * as React from 'react'
import { Input } from '@features/ui/'
import { MaskedInput } from './MaskedInput'
import { getMaskedPhoneValue, isPhoneComplete } from '@utils/index'

type IPhoneInputProps = React.ComponentProps<typeof Input>

export function PhoneInput({ ...props }: IPhoneInputProps) {
  return <MaskedInput {...props} isComplete={isPhoneComplete} getMaskedValue={getMaskedPhoneValue} />
}

PhoneInput.defaultProps = Input.defaultProps
