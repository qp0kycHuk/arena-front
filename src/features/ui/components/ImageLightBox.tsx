import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { Button } from './Button'
import { CrossIcon } from '@assets/icons/stroke'

interface IImageLightBoxProps extends React.PropsWithChildren {
  src: string
}

export function ImageLightBox({ children, src }: IImageLightBoxProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="cursor-pointer" onClick={() => setIsOpen(true)}>
        {children}
      </div>
      {isOpen &&
        createPortal(
          <div className="fixed inset-0 z-40 flex p-4 bg-black bg-opacity-80">
            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
            <img src={src} alt="" className="z-20 max-w-full max-h-full m-auto" />
            <Button variant="text" icon className="fixed z-30 right-1 top-1" onClick={() => setIsOpen(false)}>
              <CrossIcon className="text-white" />
            </Button>
          </div>,
          document.body
        )}
    </>
  )
}
