import React from 'react'
import { ArticleView } from '@views/articles'
import { useParams } from 'react-router-dom'

export function ArticleViewPage() {
  const { id } = useParams()

  return <>{id ? <ArticleView articleId={id} /> : 'Loading..'}</>
}
