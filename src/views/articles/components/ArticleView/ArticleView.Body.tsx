import * as React from 'react'
import { useGenerateHtml } from '@features/editor'
import { IArticle } from '@models/Article'
import classNames from 'classnames'
import { Fancybox } from '@/lib/Fancybox'
import { Skeleton } from '@/components/Skeleton'

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
        <Skeleton className="h-3 w-[500px] " />
        <Skeleton className="w-64 h-3" />
        <Skeleton className="h-3 w-96" />
        <Skeleton className="w-64 h-3" />
        <Skeleton className="h-3" />
        <Skeleton className="w-64 h-3" />
      </div>
    )
  }

  return (
    <Fancybox>
      <div className={classNames('ProseMirror', className)} dangerouslySetInnerHTML={{ __html: htmlBody }}></div>
    </Fancybox>
  )
}
