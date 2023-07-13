import React from 'react'
import { Navigate, useParams } from 'react-router'
import { UserView } from '../components/UserView/UserView'
import { useDocumentTitle } from '@hooks/useDocumentTitle'
import { useFetchUserById } from '@store/users/users.hooks'

export function UserViewPage() {
  const { id } = useParams()
  const { item: user } = useFetchUserById(id as string)
  const userFullName = ((user?.first_name || '') + ' ' + (user?.last_name || '')).trim()
  useDocumentTitle(userFullName || '')

  if (!id) {
    return <Navigate to="/" />
  }

  return <UserView user={user} />
}
