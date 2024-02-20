import React from 'react'
import { ArticleViewImage } from './ArticleView.Image'
import { ArticleViewTitle } from './ArticleView.Title'
import { ArticleViewBody } from './ArticleView.Body'
import { ArticleViewDates } from './ArticleView.Dates'
import { Buttons } from './Buttons/Buttons'
import { ArticleViewImages } from './ArticleView.Images'
import { Tag } from '@components/Tag'
import { useDocumentTitle } from '@hooks/useDocumentTitle'
import { PageContent } from '@layouts/PageContent'
import { ArticleViewAuthor } from './ArticleView.Author'
import { ArticleViewLinks } from './ArticleView.Links'
import { useFetchArticleById } from '@store/articles/'
import { Documents } from './ArticleView.Documents'

interface IArticleViewProps {
  articleId: EntityId
}

export function ArticleView({ articleId }: IArticleViewProps) {
  const { data, isFetching } = useFetchArticleById(articleId)

  const article = data?.item
  useDocumentTitle(article?.name)

  return (
    <PageContent className="flex">
      <div className="flex-1 p-8">
        <div className="flex items-center mb-7">
          <ArticleViewImage article={article} isLoading={isFetching} />
          <ArticleViewTitle article={article} isLoading={isFetching} />
        </div>
        <ArticleViewBody article={article} isLoading={isFetching} className="mb-8" />
        <ArticleViewLinks article={article} isLoading={isFetching} className="mb-8" />
        <ArticleViewImages article={article} isLoading={isFetching} className="mb-8" />
        <Documents article={article} isLoading={isFetching} />
      </div>
      <div className="min-w-[266px] w-[266px] py-8 px-6 border-l border-default/20">
        <Buttons article={article} isLoading={isFetching} />
        <ArticleViewAuthor article={article} isLoading={isFetching} className="mt-8" />
        <div className="my-8">
          <ArticleViewDates article={article} isLoading={isFetching} />
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
