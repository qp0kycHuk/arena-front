import * as React from 'react'
import { ImageIcon } from '@assets/icons/stroke'
import { IArticle } from '@models/Article'

interface IArticleViewImageProps {
  article?: IArticle
  isLoading?: boolean
}

export function ArticleViewImage({ article, isLoading }: IArticleViewImageProps) {
  const imageClassName = 'self-start h-20 mr-6 overflow-hidden rounded-xl w-28'
  const imageSrc = article?.image_src ? article.image_src : ''

  if (!article || isLoading) {
    return <div className={imageClassName + ' animate-pulse bg-gray bg-opacity-50'}> </div>
  }

  if (!imageSrc) {
    return (
      <div className={imageClassName + ' flex bg-gray bg-opacity-10'}>
        <ImageIcon className="m-auto text-3xl text-gray" />
      </div>
    )
  }

  return (
    <div className={imageClassName}>
      <img src={imageSrc} alt="" className="object-cover w-full h-full" />
    </div>
  )
}
