import React from 'react'
import { ArticleView } from '@features/articles'
import { useParams } from 'react-router-dom'

export function ArticleViewPage() {
  const { id } = useParams()

  return <>{id ? <ArticleView articleId={id} /> : 'Loading..'}</>
}
