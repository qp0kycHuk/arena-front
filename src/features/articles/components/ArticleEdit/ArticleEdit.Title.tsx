import React, { useCallback } from 'react'
import { ContentEditable } from '@components/ContentEditable'
import { useArticleEditMainContext } from './ArticleEdit.Context'
import { useDebouncedCallback } from 'use-debounce'

export function ArticleEditTitle() {
  const { article, update } = useArticleEditMainContext()

  const changeHandler = useCallback((event: React.ChangeEvent<HTMLDivElement>) => {
    update({
      name: event.target.textContent || '',
    })
  }, [])

  const debouncedChangeHandler = useDebouncedCallback(changeHandler, 800)

  return <ContentEditable className="mb-8 text-3xl width-placeholder" data-placeholder="Введите название статьи" value={article?.name || ''} onChange={debouncedChangeHandler} />
}
