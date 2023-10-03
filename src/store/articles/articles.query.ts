import { articlesApi } from './articles.api'
import { createQueries } from '@store/utils/queries'

const ARTICLES_QUERY_KEY = 'articles'

export const {
  useFetch: useFetchArticles,
  useFetchById: useFetchArticleById,
  useUpsert: useUpsertArticle,
  useDelete: useDeleteArticle,
} = createQueries({ key: ARTICLES_QUERY_KEY, api: articlesApi })
