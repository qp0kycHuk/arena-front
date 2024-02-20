import * as React from 'react'
import { Button } from '@features/ui'
import { Spiner } from '@components/Spiner'
import { ArticleEditImages } from './ArticleEdit.Images'
import { ArticleEditAnons } from './ArticleEdit.Anons'
import { ArticleEditTags } from './ArticleEdit.Tags'
import { ArticleEditEditor } from './ArticleEdit.Editor'
import { ArticleEditTitle } from './ArticleEdit.Title'
import { ArticleEditLinks } from './ArticleEdit.Links'
import {
  ArticleEditContextProvider,
  useArticleEditMainContext,
  useArticleEditUtilsContext,
} from './ArticleEdit.Context'
import { ArticleEditDocuments } from './ArticleEdit.Documents'
import { Excerpt } from './ArticleEdit.Excerpt'

interface IArticleEditProps {
  articleId?: EntityId
}

// TODO links, editor images, editor files

function ArticleEditInner() {
  const { article, loading } = useArticleEditMainContext()
  const { submitHandler } = useArticleEditUtilsContext()

  return (
    <form className="" onSubmit={submitHandler}>
      <div className="text-[26px] font-semibold mb-7">{article?.name || 'Новая статья'}</div>
      <div className="border border-default/20 rounded-2xl">
        <div className="px-8 py-6">
          <ArticleEditTitle />
          <ArticleEditEditor />
        </div>
        <div className="border-t border-default/20"></div>
        <div className="px-8 py-6">
          <Excerpt />
        </div>
        <div className="border-t border-default/20"></div>
        <div className="px-8 py-6">
          <ArticleEditAnons />
        </div>
        <div className="border-t border-default/20"></div>
        <div className="px-8 py-6">
          <ArticleEditImages />
        </div>
        <div className="border-t border-default/20"></div>
        <div className="px-8 py-6">
          <ArticleEditDocuments />
        </div>
        <div className="border-t border-default/20"></div>
        <div className="px-8 py-6">
          <ArticleEditLinks />
        </div>
        <div className="border-t border-default/20"></div>
        <div className="px-8 py-6">
          <ArticleEditTags />
        </div>
      </div>
      <div className="flex gap-4 mt-8">
        <Button type="submit" disabled={loading}>
          {loading ? <Spiner /> : 'Сохранить'}
        </Button>
        <Button variant="light">Отмена</Button>
      </div>
    </form>
  )
}

export function ArticleEdit({ articleId }: IArticleEditProps) {
  return (
    <ArticleEditContextProvider articleId={articleId}>
      <ArticleEditInner />
    </ArticleEditContextProvider>
  )
}
