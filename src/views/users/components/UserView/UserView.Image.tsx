import React from 'react'
import { UserIcon } from '@assets/icons/fill'
import { IUser } from '@models/User'
import { Skeleton } from '@/components/Skeleton'

interface IUserViewImageProps {
  user?: IUser
  isLoading?: boolean
  className?: string
}

export function UserViewImage({ user, isLoading, className }: IUserViewImageProps) {
  const imageClassName = 'w-[52px] h-[52px] rounded-full overflow-hidden'
  const imageSrc = user?.image_src ? user.image_src : ''

  if (!user || isLoading) {
    return <Skeleton className={imageClassName + ' ' + className} />
  }

  if (!imageSrc) {
    return (
      <div className={imageClassName + ' flex bg-default/5 ' + className}>
        <UserIcon className="m-auto text-2xl text-default/70" />
      </div>
    )
  }

  return (
    <div className={imageClassName + ' bg-default/40 ' + className}>
      <img src={user?.image_src} alt="" className="object-cover w-full h-full" />
    </div>
  )
}
