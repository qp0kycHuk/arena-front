import React from 'react'
import { Navigate, useParams } from 'react-router'
import { UserEdit } from '../components/UserEdit/UserEdit'
import { useDocumentTitle } from '@hooks/useDocumentTitle'
import { UserEditContextProvider } from '../components/UserEdit/UserEdit.Context'
import { PageContent } from '@layouts/PageContent'
import { useFetchUserById } from '@store/users/users.hooks'

export function UserEditPage() {
  const { id } = useParams()
  const { item: user } = useFetchUserById(id as string)
  useDocumentTitle('Редактирование')

  if (!id) {
    return <Navigate to="/" />
  }

  return (
    <PageContent className="p-8">
      <div className="mb-10 text-2xl font-semibold">Редактирование</div>
      <UserEditContextProvider user={user}>
        <UserEdit />
      </UserEditContextProvider>
    </PageContent>
  )
}
