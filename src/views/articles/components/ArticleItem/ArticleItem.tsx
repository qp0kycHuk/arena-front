import { Skeleton } from '@/components/Skeleton'
import { BookmarkIcon, ImageIcon } from '@assets/icons/stroke'
import { Button } from '@features/ui'
import { IArticle } from '@models/Article'
import * as React from 'react'

interface IArticleItemProps {
  article: IArticle
}

export function ArticleItem({ article }: IArticleItemProps) {
  const imageSrc = article?.image_src ? article.image_src : ''

  return (
    <div className="flex items-center px-4 py-3 -mx-4 rounded-2xl hover:bg-primary hover:bg-opacity-10">
      <div className="w-24 flex-shrink-0 h-[76px] rounded-xl relative overflow-hidden flex bg-default/5">
        {imageSrc && <img src={imageSrc} alt="" className="absolute object-cover w-full h-full" />}
        {!imageSrc && <ImageIcon className="m-auto text-3xl text-default/60" />}
      </div>
      <div className="max-w-5xl ml-4">
        <div className="mb-2 font-semibold">{article.name}</div>
        <div className="text-xs text-default/70">{article.excerpt}</div>
      </div>
      <div className="ml-auto text-right whitespace-nowrap">
        <div className="text-xs text-default/70">Созд: {new Date(article.created_at).toLocaleDateString()}</div>
        <div className="text-xs text-default/70">Ред: {new Date(article.updated_at).toLocaleDateString()}</div>
      </div>
      <Button variant="text" size="sm" color="gray" className="px-3 ml-3">
        <BookmarkIcon className="text-2xl fill-primary text-primary" />
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
          <Skeleton className="w-64 h-2" />
        </div>
      </div>
      <div className="ml-auto">
        <Skeleton className="w-24 h-3 mb-1 ml-1" />
        <Skeleton className="w-24 h-3 ml-1" />
      </div>
      <Button variant="text" size="sm" color="default" className="px-3 ml-3" disabled>
        <BookmarkIcon className="text-2xl" />
      </Button>
    </div>
  )
}
