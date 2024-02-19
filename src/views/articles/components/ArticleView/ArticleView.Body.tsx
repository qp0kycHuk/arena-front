import * as React from 'react'
import { useGenerateHtml } from '@features/editor'
import { IArticle } from '@models/Article'
import classNames from 'classnames'
import { Fancybox } from '@/lib/Fancybox'

export interface IArticleViewBodyProps {
  article?: IArticle
  isLoading?: boolean
  className?: string
}

export function ArticleViewBody({ article, isLoading, className }: IArticleViewBodyProps) {
  const htmlBody = useGenerateHtml(article?.content)

  if (!article || isLoading) {
    return (
      <div className={classNames('space-y-2', className)}>
        <div className="h-3 bg-opacity-50 animate-pulse bg-gray w-[500px] "></div>
        <div className="w-64 h-3 bg-opacity-50 animate-pulse bg-gray "></div>
        <div className="h-3 bg-opacity-50 animate-pulse bg-gray w-96 "></div>
        <div className="w-64 h-3 bg-opacity-50 animate-pulse bg-gray "></div>
        <div className="h-3 bg-opacity-50 animate-pulse bg-gray w-96 "></div>
        <div className="w-64 h-3 bg-opacity-50 animate-pulse bg-gray "></div>
      </div>
    )
  }

  return (
    <Fancybox>
      <div className={classNames('ProseMirror', className)} dangerouslySetInnerHTML={{ __html: htmlBody }}></div>
    </Fancybox>
  )
}
