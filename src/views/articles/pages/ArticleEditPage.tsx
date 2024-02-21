import { Link, useParams } from 'react-router-dom'
import { ArticleEdit } from '@views/articles'
import { Button } from '@features/ui'
import { ToLeftIcon } from '@assets/icons/stroke'
import { PageContent } from '@layouts/PageContent'
import { useDocumentTitle } from '@hooks/useDocumentTitle'
import { getRoute } from '@/utils'

export function ArticleEditPage() {
  const { id } = useParams()
  useDocumentTitle(id ? 'Редактировать' : 'Создать')

  return (
    <PageContent className="sm:p-8">
      <div className="flex mb-5 -ml-4">
        <Button as={Link} to={getRoute().articles(id)} variant="text" size="sm">
          <ToLeftIcon className="mr-2" />
          Назад
        </Button>
      </div>

      <ArticleEdit articleId={id} />
    </PageContent>
  )
}
