import React from 'react'
import { ArticleList as ListComponent } from '@views/articles'
import { PageContent } from '@layouts/PageContent'
import { useDocumentTitle } from '@hooks/useDocumentTitle'

export function ArticleListPage() {
  useDocumentTitle('Статьи')

  return (
    <PageContent className="sm:p-8">
      <ListComponent />
    </PageContent>
  )
}
