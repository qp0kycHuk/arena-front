import { IArticle } from '@/models/Article'
import { createRootApi } from '../utils/createRootApi'

const ROOT_ENDPOINT_URL = process.env.REACT_APP_API_URL + '/api/bookmarks'

export const favoritesApi = {
  async add(articleId: EntityId) {
    const { data } = await createRootApi().post(ROOT_ENDPOINT_URL + '/', { article_id: articleId })

    return data
  },

  async remove(favoriteId: EntityId) {
    const { data } = await createRootApi().delete(ROOT_ENDPOINT_URL + '/' + favoriteId)

    return data
  },

  async fetch(): Promise<IListResponse<IFavoriteItem>> {
    const { data } = await createRootApi().get(ROOT_ENDPOINT_URL + '/')

    return data
  },
}

interface IFavoriteItem {
  id: EntityId
  user_id: EntityId
  article_id: EntityId
  article: IArticle
}
