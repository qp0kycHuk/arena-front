import React from 'react'
import { UserItem, UserItemPlaceholder } from '../UserItem/UserItem'
import { useFetchUsers } from '@store/users/users.query'

export function UserList() {
  const { data, isLoading: loading } = useFetchUsers()
  const users = data?.items

  return (
    <div>
      {loading &&
        new Array(5).fill(1).map((_, index) => (
          <div key={index}>
            <UserItemPlaceholder />
            <div className="border-t border-gray border-opacity-20"></div>
          </div>
        ))}
      {users?.length && users?.length <= 0 && !loading && 'Здесь ничего нет'}
      {users?.map((user) => (
        <div key={user.id}>
          <UserItem user={user} />
          <div className="border-t border-gray border-opacity-20"></div>
        </div>
      ))}
    </div>
  )
}
