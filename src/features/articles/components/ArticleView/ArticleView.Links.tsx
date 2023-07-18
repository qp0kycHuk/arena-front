import { LinkIcon } from '@assets/icons/stroke'
import { IArticle } from '@models/Article'
import React from 'react'

interface IArticleViewLinksProps {
  article?: IArticle
  isLoading?: boolean
}

export function ArticleViewLinks({ article }: IArticleViewLinksProps) {
  if (article?.links.length === 0) {
    return null
  }

  return (
    <>
      <div className="mb-5 font-semibold">Ссылки</div>
      {article?.links.map((link, index) => (
        <a href={link.url} target="_blank" key={index} rel="noreferrer" className="flex items-center py-2 text-sm hover:underline">
          <LinkIcon className="mr-2 text-lg text-primary" />
          {link.name}
        </a>
      ))}
    </>
  )
}
