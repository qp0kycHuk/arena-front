import React from 'react'
import { useParams } from 'react-router-dom'
import { ArticleEdit } from '@views/articles'
import { Button } from '@features/ui'
import { ToLeftIcon } from '@assets/icons/stroke'
import { ArticleEditContextProvider } from '../components/ArticleEdit/ArticleEdit.Context'
import { PageContent } from '@layouts/PageContent'
import { useDocumentTitle } from '@hooks/useDocumentTitle'

export function ArticleEditPage() {
  const { id } = useParams()
  useDocumentTitle(id ? 'Редактировать' : 'Создать')

  return (
    <PageContent className="p-8">
      <Button variant="text" size="sm" className="mb-5">
        <ToLeftIcon className="mr-2" />
        Назад
      </Button>

      <ArticleEdit articleId={id} />
    </PageContent>
  )
}
