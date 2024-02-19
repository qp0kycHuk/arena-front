import React from 'react'
import { UserIcon } from '@assets/icons/fill'
import { IUser } from '@models/User'
import { getRoute } from '@utils/index'
import { Link } from 'react-router-dom'
import { Skeleton } from '@/components/Skeleton'

interface IUserItemProps {
  user: IUser
}

export function UserItem({ user }: IUserItemProps) {
  return (
    <Link to={getRoute().users(user.id)}>
      <div className="flex items-center px-4 py-3 -mx-4 rounded-2xl hover:bg-primary hover:bg-opacity-10">
        <div className="w-[52px] h-[52px] rounded-full overflow-hidden mr-6 bg-default/5 flex">
          {user.image_src ? (
            <img src={user.image_src} alt="" className="object-cover w-full h-full" />
          ) : (
            <UserIcon className="m-auto text-2xl text-default/70" />
          )}
        </div>
        <div className="w-1/4">
          <div className="font-semibold">
            {user.last_name} {user.first_name} {user.patronymic}
          </div>
        </div>
        <div className="w-1/6">
          <div className="text-sm opacity-60">{user.positions[0]?.name}</div>
        </div>
        <div className="w-1/6">
          <div className="text-sm">{user.role}</div>
        </div>
      </div>
    </Link>
  )
}

export function UserItemPlaceholder() {
  return (
    <div className="flex items-center py-3">
      <Skeleton className="w-[52px] h-[52px] rounded-full overflow-hidden mr-6" />
      <div className="w-1/4">
        <Skeleton className="w-64 h-5" />
      </div>
      <div className="w-1/6">
        <Skeleton className="w-32 h-5" />
      </div>
      <div className="w-1/6">
        <Skeleton className="w-32 h-5" />
      </div>
    </div>
  )
}
