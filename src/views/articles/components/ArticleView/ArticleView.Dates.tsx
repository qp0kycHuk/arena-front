import * as React from 'react'
import { IArticle } from '@models/Article'
import { Skeleton } from '@/components/Skeleton'

interface IArticleViewDatesProps {
  article?: IArticle
  isLoading?: boolean
}

export function ArticleViewDates({ article, isLoading }: IArticleViewDatesProps) {
  const separatorClassName = 'my-2 border-t border-dashed border-default opacity-20'

  if (!article || isLoading) {
    return (
      <>
        <div className="flex items-center">
          <div className="text-xs text-default/80">Создано:</div>
          <Skeleton className="w-16 h-5 ml-auto" />
        </div>
        <div className={separatorClassName}></div>
        <div className="flex items-center">
          <div className="text-xs text-default/80">Редактирование:</div>
          <Skeleton className="w-16 h-5 ml-auto" />
        </div>
      </>
    )
  }

  return (
    <>
      <div className="flex items-center">
        <div className="text-xs text-default/70">Создано:</div>
        <div className="ml-auto text-sm font-semibold">{new Date(article?.created_at || '').toLocaleDateString()}</div>
      </div>
      <div className={separatorClassName}></div>
      <div className="flex items-center">
        <div className="text-xs text-default/70">Редактирование:</div>
        <div className="ml-auto text-sm font-semibold">{new Date(article?.updated_at || '').toLocaleDateString()}</div>
      </div>
    </>
  )
}
