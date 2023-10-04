import React from 'react'
import { UserIcon } from '@assets/icons/fill'
import { IUser } from '@models/User'

interface IUserViewImageProps {
  user?: IUser
  isLoading?: boolean
  className?: string
}

export function UserViewImage({ user, isLoading, className }: IUserViewImageProps) {
  const imageClassName = 'w-[52px] h-[52px] rounded-full overflow-hidden'
  const imageSrc = user?.image_src ? user.image_src : ''

  if (!user || isLoading) {
    return <div className={imageClassName + ' animate-pulse bg-gray bg-opacity-50 ' + className}> </div>
  }

  if (!imageSrc) {
    return (
      <div className={imageClassName + ' flex bg-gray bg-opacity-10 ' + className}>
        <UserIcon className="m-auto text-2xl text-gray" />
      </div>
    )
  }

  return (
    <div className={imageClassName + ' bg-gray bg-opacity-50 ' + className}>
      <img src={user?.image_src} alt="" className="object-cover w-full h-full" />
    </div>
  )
}
