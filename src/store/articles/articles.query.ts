import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { articlesApi } from './articles.api'
import { createQueries } from '@store/utils/queries'
import { EntityId } from '@reduxjs/toolkit'
import { IArticle } from '@/models/Article'
import { getEntities, getIds } from '@/utils/helpers/entity'

const ARTICLES_QUERY_KEY = 'articles'

export const {
  useFetch: useFetchArticles,
  useFetchById: useFetchArticleById,
  useUpsert: useUpsertArticle,
  useDelete: useDeleteArticle,
} = createQueries({ key: ARTICLES_QUERY_KEY, api: articlesApi })

export function useFetchArticlesByUserId(userId: EntityId, options: UseQueryOptions) {
  const queryClient = useQueryClient()

  return useQuery([ARTICLES_QUERY_KEY, 'user', userId?.toString()], articlesApi.fetchByUserId.bind(null, userId), {
    enabled: options.enabled,
    placeholderData: () => {
      const items =
        queryClient
          .getQueryData<IListResponse<IArticle>>([ARTICLES_QUERY_KEY])
          ?.items.filter((d) => d.owner_id?.toString() === userId?.toString()) || []

      return {
        items: items,
        ids: getIds(items),
        entities: getEntities(items),
      }
    },
  })
}
