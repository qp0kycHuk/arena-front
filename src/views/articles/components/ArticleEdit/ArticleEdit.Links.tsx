import React from 'react'
import { Links } from '@features/editor'
import { useArticleEditMainContext } from './ArticleEdit.Context'
import { ILink } from '@models/Link'

export function ArticleEditLinks() {
  const { article, update } = useArticleEditMainContext()

  function changeHandler(updatedLinks: Partial<ILink>[]) {
    update({
      links: updatedLinks as ILink[],
    })
  }

  return <Links links={article?.links || []} onChange={changeHandler}></Links>
}
