import * as React from 'react'
import { BookmarkIcon, PencilIcon } from '@assets/icons/stroke'
import { Button } from '@features/ui'
import { IArticle } from '@models/Article'
import { getRoute } from '@utils/index'
import { Link } from 'react-router-dom'
import { isUser } from '@views/users'
import { useAuth } from '@store/auth'

interface IArticleViewButtonsProps {
  article?: IArticle
  isLoading?: boolean
}

export function ArticleViewButtons({ article, isLoading }: IArticleViewButtonsProps) {
  const { data: auth } = useAuth()
  const currentUser = auth?.user
  const isCurrentUserRole = isUser(currentUser)

  if (!article || isLoading) {
    return (
      <div className="flex gap-4">
        <Button variant="contur" color="gray" disabled>
          <PencilIcon className="text-2xl" />
        </Button>
        <Button variant="contur" color="gray" disabled>
          <BookmarkIcon className="text-2xl" />
        </Button>
      </div>
    )
  }

  return (
    <div className="flex gap-4">
      {(article.owner_id === currentUser?.id || isCurrentUserRole.admin) && (
        <Link to={getRoute().articles.edit(article.id)}>
          <Button variant="contur" color="gray">
            <PencilIcon className="text-2xl" />
          </Button>
        </Link>
      )}
      <Button variant="contur" color="gray">
        <BookmarkIcon className="text-2xl" />
      </Button>
    </div>
  )
}
