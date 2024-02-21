import React from 'react'
import { useDocumentTitle } from '@hooks/useDocumentTitle'
import { PageContent } from '@layouts/PageContent'
import { UserList } from '../components/UserList/UserList'

export function UserListPage() {
  useDocumentTitle('Пользователи')

  return (
    <PageContent className="sm:p-8">
      <div className="mb-10 text-2xl font-semibold">Пользователи</div>

      <UserList />
    </PageContent>
  )
}
