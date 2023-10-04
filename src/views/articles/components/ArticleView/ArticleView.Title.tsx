import React from 'react'
import { IArticle } from '@models/Article'

interface IArticleViewTitleProps {
  article?: IArticle
  isLoading?: boolean
}

export function ArticleViewTitle({ article, isLoading }: IArticleViewTitleProps) {
  if (!article || isLoading) {
    return (
      <div className="space-y-1">
        <div className="h-6 bg-opacity-50 animate-pulse bg-gray w-96"></div>
        <div className="w-64 h-6 bg-opacity-50 animate-pulse bg-gray"></div>
      </div>
    )
  }

  return <div className="text-2xl font-semibold"> {article?.name} </div>
}
