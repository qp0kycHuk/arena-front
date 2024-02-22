import React from 'react'
import { Button } from '@features/ui'
import { useDocumentTitle } from '@hooks/useDocumentTitle'
import { PageContent } from '@layouts/PageContent'
import { Link } from 'react-router-dom'
import { Empty } from '@/components/Empty'

export function NotFoundPage() {
  useDocumentTitle('Страница не найдена')

  return (
    <PageContent className="sm:p-8">
      <Empty title="Страница не найдена" />
      <Link to={'/'}>
        <Button className="mt-6 mx-auto">На главную</Button>
      </Link>
    </PageContent>
  )
}
