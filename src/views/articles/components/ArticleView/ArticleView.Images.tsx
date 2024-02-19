import React from 'react'
import { IArticle } from '@models/Article'
import { Fancybox } from '@/lib/Fancybox'
import classNames from 'classnames'
import { Skeleton } from '@/components/Skeleton'

interface IArticleViewImagesProps {
  article?: IArticle
  isLoading?: boolean
  className?: string
}

export function ArticleViewImages({ article, isLoading, className }: IArticleViewImagesProps) {
  if (!article || isLoading) {
    return (
      <div className={classNames(className, 'flex flex-wrap gap-6')}>
        {new Array(3).fill(1).map((_, index) => {
          return <Skeleton className="h-40 w-52 rounded-xl " key={index} />
        })}
      </div>
    )
  }

  if (!article?.files?.length) {
    return null
  }

  return (
    <div className={className}>
      <div className="mb-5 font-semibold">Изображения</div>
      <Fancybox className="flex flex-wrap gap-6">
        {article?.files.map((item) => (
          <a key={item.id} href={item.src || ''} data-fancybox>
            <div className="h-40 overflow-hidden w-52 rounded-xl bg-default/5">
              <img src={item.src} alt="" className="object-cover w-full h-full" />
            </div>
          </a>
        ))}
      </Fancybox>
    </div>
  )
}
