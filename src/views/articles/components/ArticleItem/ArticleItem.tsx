import * as React from 'react'
import { Skeleton } from '@/components/Skeleton'
import { markFromQuery } from '@/utils/helpers/markFromQuery'
import { useProjectsContext } from '@/views/projects/components/Projects.Context'
import { BookmarkIcon, ImageIcon } from '@assets/icons/stroke'
import { Button } from '@features/ui'
import { IArticle } from '@models/Article'
import { useArticleFavorite } from '@/store/favorites/favorites.hooks'
import classNames from 'classnames'

interface IArticleItemProps {
  article: IArticle
}

export function ArticleItem({ article }: IArticleItemProps) {
  const imageSrc = article?.image_src ? article.image_src : ''
  const { searchQuery } = useProjectsContext()
  const { isFavorite, toggle, loading } = useArticleFavorite(article)

  function favoriteClickHandler(event: Event) {
    event.preventDefault()
    event.stopPropagation()
    toggle()
  }

  return (
    <div className="flex items-center px-4 py-3 -mx-4 rounded-2xl hover:bg-primary hover:bg-opacity-10">
      <div className="w-24 flex-shrink-0 h-[76px] rounded-xl relative overflow-hidden flex bg-default/5">
        {imageSrc && <img src={imageSrc} alt="" className="absolute object-cover w-full h-full" />}
        {!imageSrc && <ImageIcon className="m-auto text-3xl text-default/60" />}
      </div>
      <div className="max-w-5xl ml-4">
        <div
          className="mb-2 font-semibold with-mark-query"
          dangerouslySetInnerHTML={{ __html: markFromQuery(article.name, searchQuery) }}
        ></div>
        <div className="text-xs text-default/70 max-sm:hidden">{article.excerpt}</div>
      </div>
      <div className="ml-auto text-right whitespace-nowrap max-sm:hidden">
        <div className="text-xs text-default/70">Созд: {new Date(article.created_at).toLocaleDateString()}</div>
        <div className="text-xs text-default/70">Ред: {new Date(article.updated_at).toLocaleDateString()}</div>
      </div>
      <Button
        variant="text"
        size="sm"
        color="gray"
        className="px-3 ml-auto sm:ml-3"
        disabled={loading}
        onClick={favoriteClickHandler}
      >
        <BookmarkIcon className={classNames('text-2xl ', isFavorite ? 'fill-primary text-primary' : '')} />
      </Button>
    </div>
  )
}

export function ArticleItemPlacehlder() {
  return (
    <div className="flex items-center py-3">
      <Skeleton className="w-24 h-[76px] rounded-xl" />
      <div className="max-w-5xl ml-4">
        <Skeleton className="w-64 h-5 mb-3" />
        <div className="max-w-md ">
          <Skeleton className="w-64 h-2 mb-2" />
          <Skeleton className="w-64 h-2 max-sm:hidden" />
        </div>
      </div>
      <div className="ml-auto max-sm:hidden">
        <Skeleton className="w-24 h-3 mb-1 ml-1" />
        <Skeleton className="w-24 h-3 ml-1" />
      </div>
      <Button variant="text" size="sm" color="default" className="px-3 ml-3" disabled>
        <BookmarkIcon className="text-2xl" />
      </Button>
    </div>
  )
}
