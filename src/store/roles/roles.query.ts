import { createQueries } from '@store/utils/queries'
import { rolesApi } from './roles.api'

const ROLES_QUERY_KEY = 'roles'

export const {
  useFetch: useFetchRoles,
  useFetchById: useFetchRoleById,
  useUpsert: useUpsertRole,
  useDelete: useDeleteRole,
} = createQueries({ key: ROLES_QUERY_KEY, api: rolesApi })
