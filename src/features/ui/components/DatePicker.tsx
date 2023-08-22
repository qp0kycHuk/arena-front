import AirDatepicker, { AirDatepickerOptions } from 'air-datepicker'
import localeRu from 'air-datepicker/locale/ru'
import { Input, InputProps } from './Input'
import React, { useEffect, useRef } from 'react'

export function DatePicker({
  dateFormat,
  minDate,
  maxDate,
  timepicker,
  onSelect,
  onChange,
  onFocus,
  value,
  ...props
}: IDatePickerProps) {
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
      altFieldDateFormat: 'DD.MM.YY',
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
      ...initialDates,
    })

    return () => {
      datepickerInstance.current?.destroy()
    }
  }, [value])

  return <Input readOnly {...props} ref={inputRef} />
}

interface IDatePickerProps extends Partial<AirDatepickerOptions>, Omit<InputProps, 'onFocus' | 'onSelect' | 'value'> {
  value?: string | string[] | Date | Date[]
}
