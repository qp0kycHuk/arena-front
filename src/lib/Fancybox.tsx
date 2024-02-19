import React, { useRef, useEffect } from 'react'
import { Fancybox as NativeFancybox } from '@fancyapps/ui'
import { OptionsType } from '@fancyapps/ui/types/Fancybox/options'

export function Fancybox(props: IProps) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current

    const delegate = props.delegate || '[data-fancybox]'
    const options = props.options || {}

    NativeFancybox.bind(container, delegate, options)

    return () => {
      NativeFancybox.unbind(container)
      NativeFancybox.close()
    }
  })

  return (
    <div className={props.className} ref={containerRef}>
      {props.children}
    </div>
  )
}

interface IProps extends React.PropsWithChildren {
  options?: Partial<OptionsType>
  delegate?: string
  className?: string
}
