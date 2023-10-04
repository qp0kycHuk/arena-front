import { createQueries } from '@store/utils/queries'
import { tagsApi } from './tags.api'

const TAGS_QUERY_KEY = 'tags'

export const {
  useFetch: useFetchTags,
  useFetchById: useFetchTagById,
  useUpsert: useUpsertTag,
  useDelete: useDeleteTag,
} = createQueries({ key: TAGS_QUERY_KEY, api: tagsApi })
