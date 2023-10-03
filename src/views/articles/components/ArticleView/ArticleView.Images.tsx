import React from 'react'
import { ImageLightBox } from '@features/ui'
import { IArticle } from '@models/Article'

interface IArticleViewImagesProps {
  article?: IArticle
  isLoading?: boolean
}

export function ArticleViewImages({ article, isLoading }: IArticleViewImagesProps) {
  if (!article || isLoading) {
    return (
      <div className="flex flex-wrap gap-6">
        {new Array(3).fill(1).map((_, index) => {
          return (
            <div className="h-40 overflow-hidden bg-opacity-50 w-52 rounded-xl animate-pulse bg-gray" key={index}>
              {' '}
            </div>
          )
        })}
      </div>
    )
  }

  if (!article?.files?.length) {
    return null
  }

  return (
    <div>
      <div className="mb-5 font-semibold">Изображения</div>
      <div className="flex flex-wrap gap-6">
        {article?.files.map((item) => (
          <ImageLightBox key={item.id} src={item.src || ''}>
            <div className="h-40 overflow-hidden w-52 rounded-xl bg-gray bg-opacity-10">
              <img src={item.src} alt="" className="object-cover w-full h-full" />
            </div>
          </ImageLightBox>
        ))}
      </div>
    </div>
  )
}
