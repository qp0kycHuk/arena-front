import React from 'react'
import { Links, useLinks } from '@features/editor'
import { useArticleEditMainContext } from './ArticleEdit.Context'

export function ArticleEditLinks() {
  const { article, update } = useArticleEditMainContext()

  const linksController = useLinks()
  console.log(linksController.links)

  return <Links controller={linksController}></Links>
}
