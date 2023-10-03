import React from 'react'
import { useDocumentTitle } from '@hooks/useDocumentTitle'
import { PageContent } from '@layouts/PageContent'
import { useFetchArticles } from '@store/articles/articles.query'

export function Home() {
  useDocumentTitle('Главная')

  const { data } = useFetchArticles()

  return (
    <PageContent className="p-8">
      <div className="text-3xl font-semibold">Home page</div>
    </PageContent>
  )
}
