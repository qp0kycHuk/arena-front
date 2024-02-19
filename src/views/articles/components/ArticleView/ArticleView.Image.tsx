import * as React from 'react'
import { ImageIcon } from '@assets/icons/stroke'
import { IArticle } from '@models/Article'
import { Skeleton } from '@/components/Skeleton'

interface IArticleViewImageProps {
  article?: IArticle
  isLoading?: boolean
}

export function ArticleViewImage({ article, isLoading }: IArticleViewImageProps) {
  const imageClassName = 'self-start h-20 mr-6 overflow-hidden rounded-xl w-28'
  const imageSrc = article?.image_src ? article.image_src : ''

  if (!article || isLoading) {
    return <Skeleton className={imageClassName} />
  }

  if (!imageSrc) {
    return (
      <div className={imageClassName + ' flex bg-default/5'}>
        <ImageIcon className="m-auto text-3xl text-default/70" />
      </div>
    )
  }

  return (
    <div className={imageClassName}>
      <img src={imageSrc} alt="" className="object-cover w-full h-full" />
    </div>
  )
}
