import React from 'react'
import { Navigate, useParams } from 'react-router'
import { UserView } from '../components/UserView/UserView'
import { useDocumentTitle } from '@hooks/useDocumentTitle'
import { useFetchUserById } from '@store/users/users.query'

export function UserViewPage() {
  const { id } = useParams()
  const { data } = useFetchUserById(id as string)
  const user = data?.item
  const userFullName = ((user?.first_name || '') + ' ' + (user?.last_name || '')).trim()
  useDocumentTitle(userFullName || '')

  if (!id) {
    return <Navigate to="/" />
  }

  return <UserView user={user} />
}
