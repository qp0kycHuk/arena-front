import { createQueries } from '@store/utils/queries'
import { usersApi } from './users.api'

const USERS_QUERY_KEY = 'users'

export const {
  useFetch: useFetchUsers,
  useFetchById: useFetchUserById,
  useUpsert: useUpsertUser,
  useDelete: useDeleteUser,
} = createQueries({ key: USERS_QUERY_KEY, api: usersApi })
