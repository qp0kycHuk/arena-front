import React from 'react'
import { ArticleViewImage } from './ArticleView.Image'
import { ArticleViewTitle } from './ArticleView.Title'
import { ArticleViewBody } from './ArticleView.Body'
import { ArticleViewDates } from './ArticleView.Dates'
import { ArticleViewButtons } from './ArticleView.Buttons'
import { ArticleViewImages } from './ArticleView.Images'
import { Tag } from '@components/Tag'
import { EntityId } from '@reduxjs/toolkit'
import { useDocumentTitle } from '@hooks/useDocumentTitle'
import { PageContent } from '@layouts/PageContent'
import { ArticleViewAuthor } from './ArticleView.Author'
import { ArticleViewLinks } from './ArticleView.Links'
import { useFetchArticleById } from '@store/articles/'

interface IArticleViewProps {
  articleId: EntityId
}

export function ArticleView({ articleId }: IArticleViewProps) {
  const { data } = useFetchArticleById(articleId)

  const article = data?.item
  useDocumentTitle(article?.name)

  return (
    <PageContent className="flex">
      <div className="flex-1 p-8">
        <div className="flex items-center mb-7">
          <ArticleViewImage article={article} />
          <ArticleViewTitle article={article} />
        </div>
        <ArticleViewBody article={article} />
        <ArticleViewLinks article={article} />
        <ArticleViewImages article={article} />
      </div>
      <div className="min-w-[266px] w-[266px] py-8 px-6 border-l border-gray border-opacity-30">
        <ArticleViewButtons article={article} />
        <ArticleViewAuthor article={article} className="mt-8" />
        <div className="my-8">
          <ArticleViewDates article={article} />
        </div>
        <div className="flex flex-wrap gap-2">
          {article?.tags.map((tag) => (
            <Tag key={tag.id}>#{tag.name}</Tag>
          ))}
        </div>
      </div>
    </PageContent>
  )
}
