import React from 'react'
import { CrossIcon } from '@assets/icons/stroke'
import { Button } from '@features/ui'
import { CloseButtonProps, ToastContainer as Container, ToastContainerProps } from 'react-toastify'

import { toast as toastCore } from 'react-toastify'

export const toast = toastCore

const contextClass = {
  success: 'bg-green text-white',
  error: 'bg-red text-white',
  info: 'bg-primary text-white',
  warning: 'bg-yellow text-white',
  default: 'bg-l3 text-default',
  dark: 'bg-black text-white',
}

const CloseButton = ({ closeToast, type }: CloseButtonProps) => {
  return (
    <Button onClick={closeToast} variant="text" icon size="sm" color={type === 'default' ? 'primary' : 'gray'}>
      <CrossIcon className={type !== 'default' ? 'text-white' : ''} />
    </Button>
  )
}

// TODO
// const CustomIcon = (props: IconProps) => {
//   return <div className="self-start">{props.type}</div>
// }

export function ToastContainer(props: ToastContainerProps & React.RefAttributes<HTMLDivElement>) {
  return (
    <Container
      toastClassName={(context) =>
        contextClass[context?.type || 'default'] +
        ' min-h-[62px] shadow-lg p-3 relative flex mb-3 rounded-md overflow-hidden cursor-pointer text-sm font-semibold'
      }
      bodyClassName={() => 'flex items-center flex-grow'}
      // icon={CustomIcon}
      closeButton={CloseButton}
      position="bottom-left"
      theme="colored"
      draggablePercent={25}
      hideProgressBar={true}
      limit={8}
      closeOnClick
      {...props}
    />
  )
}
