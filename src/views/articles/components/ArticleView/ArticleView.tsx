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
import { Link, Navigate } from 'react-router-dom'
import { getRoute } from '@/utils'
import { ToLeftIcon } from '@/assets/icons/stroke'
import { Button } from '@/features/ui'
import { Breadcrumps } from '@/components/Breadcrumps/Breadcrumps'
import { IFolder } from '@/models/Folder'

interface IArticleViewProps {
  articleId: EntityId
}

export function ArticleView({ articleId }: IArticleViewProps) {
  const { data, isFetching } = useFetchArticleById(articleId)

  const article = data?.item
  useDocumentTitle(article?.name)

  if (!isFetching && !data?.item) {
    return <Navigate to={getRoute().projects()} />
  }

  return (
    <PageContent className="flex">
      <div className="flex-1 p-8 pt-3">
        <Breadcrumps item={article?.folders[0] as IFolder}>
          <Link to={getRoute().articles(article?.id)} className="hover:underline">
            {article?.name}
          </Link>
        </Breadcrumps>
        <div className="flex mb-5 -ml-4">
          <Button as={Link} to={getRoute().projects(article?.folders[0]?.id || '')} variant="text" size="sm">
            <ToLeftIcon className="mr-2" />
            Назад
          </Button>
        </div>
        <div className="flex items-center mb-7">
          <ArticleViewImage article={article} isLoading={isFetching} />
          <ArticleViewTitle article={article} isLoading={isFetching} />
        </div>
        <ArticleViewBody article={article} isLoading={isFetching} className="mb-8" />
        <ArticleViewLinks article={article} isLoading={isFetching} className="mb-8" />
        <ArticleViewImages article={article} isLoading={isFetching} className="mb-8" />
        <Documents article={article} isLoading={isFetching} />
      </div>
      <div className="flex-shrink-0 w-[266px] py-8 px-6 border-l border-default/20">
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
