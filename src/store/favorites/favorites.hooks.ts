import { IArticle } from '@/models/Article'
import { useFavorites } from './favorites.query'
import { useToggle } from '@/hooks/useToggle'
import { toast } from '@/lib/Toast'
import { favoritesApi } from './favorites.api'

export function useArticleFavorite(article: IArticle) {
  const { data, refetch } = useFavorites()
  const [loading, , loadingStart, loadingEnd] = useToggle()
  const favoriteItem = data?.items.find((item) => item.article_id == article.id)
  const isFavorite = !!favoriteItem

  async function toggle() {
    let id

    loadingStart()

    if (isFavorite) {
      id = toast.loading('Удаление')

      await favoritesApi.remove(favoriteItem.id)
      await refetch()

      toast.update(id, { render: 'Удалено из избранного', type: 'warning', isLoading: false, autoClose: 2000 })
    } else {
      id = toast.loading('Добавление')

      await favoritesApi.add(article.id)
      await refetch()

      toast.update(id, { render: 'Добавлено в избранное', type: 'success', isLoading: false, autoClose: 2000 })
    }

    loadingEnd()
  }

  return {
    loading,
    favoriteItem,
    isFavorite,
    toggle,
  }
}
