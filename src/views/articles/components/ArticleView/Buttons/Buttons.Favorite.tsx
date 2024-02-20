import { BookmarkIcon } from '@/assets/icons/stroke'
import { Button } from '@/features/ui'
import { IArticle } from '@/models/Article'
import { useArticleFavorite } from '@/store/favorites/favorites.hooks'
import classNames from 'classnames'

interface IFavoriteProps {
  article: IArticle
}

export function Favorite({ article }: IFavoriteProps) {
  const { isFavorite, toggle, loading } = useArticleFavorite(article)

  return (
    <Button
      variant={isFavorite ? 'fill' : 'contur'}
      color={isFavorite ? 'primary' : 'default'}
      onClick={toggle}
      disabled={loading}
    >
      <BookmarkIcon className={classNames('text-2xl ', !isFavorite ? 'opacity-60' : '')} />
    </Button>
  )
}
