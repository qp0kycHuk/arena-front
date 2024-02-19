import React from 'react'
import { useDocumentTitle } from '@hooks/useDocumentTitle'
import { PageContent } from '@layouts/PageContent'
import { Empty } from '@/components/Empty'

export function Home() {
  useDocumentTitle('Главная')

  return (
    <PageContent className="p-8">
      <div className="text-3xl font-semibold">Home page</div>
      <Empty></Empty>
    </PageContent>
  )
}
