import * as React from 'react'
import { Input, InputProps } from '@features/ui/'
import { MaskedInput } from './MaskedInput'
import { getMaskedPhoneValue, isPhoneComplete } from '@utils/index'

type IPhoneInputProps = InputProps

export function PhoneInput({ ...props }: IPhoneInputProps) {
  return <MaskedInput {...props} isComplete={isPhoneComplete} getMaskedValue={getMaskedPhoneValue} />
}

PhoneInput.defaultProps = Input.defaultProps
