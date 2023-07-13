import AirDatepicker, { AirDatepickerOptions, AirDatepickerPositionCallback } from 'air-datepicker'
import localeRu from 'air-datepicker/locale/ru'
import { Input, InputProps } from './Input'
import React, { useEffect, useRef } from 'react'
// import { isTouchDevice } from '@utils/index';
// import { createPopper } from '@popperjs/core';

interface IDatePickerProps extends Partial<AirDatepickerOptions>, Omit<InputProps, 'onSelect' | 'value'> {
  value?: string | string[] | Date | Date[]
}

export function DatePicker({ dateFormat, minDate, maxDate, timepicker, onSelect, onChange, value, ...props }: IDatePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const datepickerInstance = useRef<AirDatepicker | null>(null)

  useEffect(() => {
    if (!inputRef.current) return

    let initialDates = {}

    if (value) {
      initialDates = {
        startDate: value ? value : false,
        selectedDates: [value ? value : false],
      }
    }

    datepickerInstance.current = new AirDatepicker(inputRef.current, {
      dateFormat: dateFormat,
      minDate: minDate || '',
      maxDate: maxDate || '',
      timepicker: timepicker || false,
      isMobile: true,
      locale: localeRu,
      autoClose: true,
      inline: false,
      onSelect: onSelect,
      startDate: new Date(),
      // position: isTouchDevice() ? 'top' : getCalendarPosition,
      ...initialDates,
    })

    return () => {
      datepickerInstance.current?.destroy()
    }
  }, [value])

  return <Input readOnly {...props} ref={inputRef} />
}

// function getCalendarPosition(...args: Parameters<AirDatepickerPositionCallback>)
//     : ReturnType<AirDatepickerPositionCallback> {
//     const [{ $datepicker, $target, $pointer, done }] = args

//     let popper = createPopper($target, $datepicker, {
//         placement: 'bottom',
//         modifiers: [
//             {
//                 name: 'flip',
//                 options: {
//                     padding: {
//                         top: 64
//                     }
//                 }
//             },
//             {
//                 name: 'offset',
//                 options: {
//                     offset: [0, 20]
//                 }
//             },
//             {
//                 name: 'arrow',
//                 options: {
//                     element: $pointer
//                 }
//             }
//         ]
//     })

//     return function completeHide() {
//         popper.destroy();
//         done();
//     }
// }
