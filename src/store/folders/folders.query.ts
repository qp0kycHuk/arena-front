import { createQueries } from '@store/utils/queries'
import { foldersApi } from './folders.api'

const FOLDERS_QUERY_KEY = 'folders'

export const {
  useFetch: useFetchFolders,
  useFetchById: useFetchFolderById,
  useUpsert: useUpsertFolder,
  useDelete: useDeleteFolder,
} = createQueries({ key: FOLDERS_QUERY_KEY, api: foldersApi })
