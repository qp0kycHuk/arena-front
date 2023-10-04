import React, { useState } from 'react'
import { toast } from '@lib/Toast'
import { Spiner } from '@components/Spiner'
import { Button, Menu } from '@features/ui'
import { ToDownIcon } from '@assets/icons/stroke'
import { UserIcon } from '@assets/icons/fill'
import { getMaskedPhoneValue, getRoute } from '@utils/index'
import { SERVER_ERROR_MESSAGE } from '@utils/const/text'
import { Link } from 'react-router-dom'
import { useAuth, useLogout } from '@/store/auth/auth.query'

export function HeaderUser() {
  const { data: auth } = useAuth()
  const user = auth?.user
  const { mutateAsync: logout } = useLogout()
  const [loading, setLoading] = useState(false)

  async function logoutHandler() {
    setLoading(true)

    try {
      await logout()
    } catch (error) {
      toast.error(SERVER_ERROR_MESSAGE)
    }

    setLoading(false)
  }

  return (
    <Menu
      align="end"
      menuButton={
        <Button variant="text" size="sm" className="px-3 ml-4" rounded shadow color="gray">
          <ToDownIcon className="text-base" />
          <div className="w-[22px] h-[22px] flex ml-2 text-white rounded-full bg-gray overflow-hidden">
            {user?.image_src ? (
              <img src={user?.image_src} alt="" className="object-cover w-full h-full" />
            ) : (
              <UserIcon className="m-auto" />
            )}
          </div>
        </Button>
      }
    >
      <div className="w-48 p-2">
        <Link
          to={getRoute().users(user?.id)}
          className="block mb-1 text-xs font-semibold text-gray dark:text-gray-300 opacity-90"
        >
          {user?.first_name} {user?.last_name}
        </Link>
        <div className="mb-4 text-sm">{getMaskedPhoneValue(user?.phone)}</div>
        <Button disabled={loading} onClick={logoutHandler} color="red" variant="light" className="w-full">
          {loading ? <Spiner /> : 'Выйти'}
        </Button>
      </div>
    </Menu>
  )
}
