import React from 'react'
import { PageContent } from '@layouts/PageContent'
import { HandbooksEditPositions } from '../components/HandbooksEdit/HandbooksEditPositions'
import { HandbooksEditTags } from '../components/HandbooksEdit/HandbooksEditTags'
import { useDocumentTitle } from '@hooks/useDocumentTitle'

export function HandbooksEditPage() {
  useDocumentTitle('Справочники')

  return (
    <PageContent className="sm:p-8">
      <div className="mb-10 text-2xl font-semibold">Справочники</div>
      <HandbooksEditTags />
      <div className="my-6 border-t border-default/10"></div>
      <HandbooksEditPositions />
    </PageContent>
  )
}
