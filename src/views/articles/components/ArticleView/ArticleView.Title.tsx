import React from 'react'
import { IArticle } from '@models/Article'
import { Skeleton } from '@/components/Skeleton'

interface IArticleViewTitleProps {
  article?: IArticle
  isLoading?: boolean
}

export function ArticleViewTitle({ article, isLoading }: IArticleViewTitleProps) {
  if (!article || isLoading) {
    return (
      <div className="space-y-1">
        <Skeleton className="h-6 w-96" />
        <Skeleton className="h-6 w-64" />
      </div>
    )
  }

  return <div className="text-2xl font-semibold"> {article?.name} </div>
}
