import { Empty } from '@/components/Empty'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { PageContent } from '@/layouts/PageContent'
import { useFavorites } from '@/store/favorites/favorites.query'
import { ArticleList } from '@/views/articles'
import { useMemo } from 'react'

export function FavoriteListPage() {
  useDocumentTitle('Статьи')
  const { data, isLoading } = useFavorites()

  const articles = useMemo(() => {
    return data?.items.map((item) => item.article) || []
  }, [data])

  return (
    <PageContent className="p-8">
      <div className="text-2xl font-semibold mb-8">Избранное</div>
      {articles?.length > 0 ? <ArticleList items={articles} loading={isLoading} /> : <Empty />}
    </PageContent>
  )
}
