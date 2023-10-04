import React from 'react'
import { Button } from '@features/ui'
import { useDocumentTitle } from '@hooks/useDocumentTitle'
import { PageContent } from '@layouts/PageContent'
import { IUser } from '@models/User'
import { getRoute } from '@utils/index'
import { Link } from 'react-router-dom'
import { UserViewImage } from './UserView.Image'
import { UserViewName } from './UserView.Name'
import { CakeIcon } from '@assets/icons/stroke'
import { useAuth } from '@store/auth'
import { isUser } from '@views/users/utils/isUser'

interface IUserViewProps {
  user?: IUser
}

export function UserView({ user }: IUserViewProps) {
  const { user: currentUser } = useAuth()
  const isCurrentUserRole = isUser(currentUser)
  const isCurrentUser = currentUser?.id === user?.id

  return (
    <PageContent className="flex">
      <div className="w-[360px] px-8 py-12 border-r border-gray border-opacity-30">
        <div className="flex items-center">
          <UserViewImage className="mr-3" user={user} />
          <UserViewName user={user} />
        </div>

        {user?.created_at ? (
          <div className="max-w-full px-5 py-2 mt-8 text-xs rounded-full bg-gray bg-opacity-10 text-gray w-max">В STDKIT с {new Date(user.created_at).toLocaleDateString()}</div>
        ) : null}

        {user?.date_of_birth ? (
          <div className="flex items-center mt-6 text-sm text-gray">
            <CakeIcon className="mr-2 text-2xl " />
            День рождения: {new Date(user.date_of_birth).toLocaleDateString()}
          </div>
        ) : null}

        <div className="flex flex-col gap-2 mt-6">
          {user?.email ? (
            <div className="flex items-center text-sm text-gray">
              <img src="/img/email.svg" alt="" className="w-6 h-6 mr-2" />
              {user.email}
            </div>
          ) : null}

          {user?.telegram ? (
            <div className="flex items-center text-sm text-gray">
              <img src="/img/telegram.svg" alt="" className="w-6 h-6 mr-2" />
              {user.telegram}
            </div>
          ) : null}
        </div>
        {(isCurrentUser || isCurrentUserRole.admin) && (
          <Link to={getRoute().users.edit(user?.id)} className="block mt-4">
            <Button className="w-full">Редактировать</Button>
          </Link>
        )}
      </div>
      <div className="flex-grow p-8">
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </PageContent>
  )
}
