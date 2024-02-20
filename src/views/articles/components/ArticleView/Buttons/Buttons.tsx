import * as React from 'react'
import { BookmarkIcon, PencilIcon } from '@assets/icons/stroke'
import { Button } from '@features/ui'
import { IArticle } from '@models/Article'
import { getRoute } from '@utils/index'
import { Link } from 'react-router-dom'
import { isUser } from '@views/users'
import { useAuth } from '@store/auth'
import { Favorite } from './Buttons.Favorite'

interface IArticleViewButtonsProps {
  article?: IArticle
  isLoading?: boolean
}

export function Buttons({ article, isLoading }: IArticleViewButtonsProps) {
  const { data: auth } = useAuth()
  const currentUser = auth?.user
  const isCurrentUserRole = isUser(currentUser)
  const isCanEdit = article?.owner_id === currentUser?.id || isCurrentUserRole.admin

  if (!article || isLoading) {
    return (
      <div className="flex gap-4">
        {isCanEdit && (
          <Button variant="contur" color="default" disabled>
            <PencilIcon className="text-2xl opacity-60" />
          </Button>
        )}
        <Button variant="contur" color="default" disabled>
          <BookmarkIcon className="text-2xl opacity-60" />
        </Button>
      </div>
    )
  }

  return (
    <div className="flex gap-4">
      {isCanEdit && (
        <Button as={Link} to={getRoute().articles.edit(article.id)} variant="contur" color="default">
          <PencilIcon className="text-2xl opacity-60" />
        </Button>
      )}
      <Favorite article={article} />
    </div>
  )
}
