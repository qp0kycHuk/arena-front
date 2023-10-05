import React from 'react'
import { UserIcon } from '@assets/icons/fill'
import { IArticle } from '@models/Article'
import { useFetchUserById } from '@store/users/'

interface IArticleViewAuthorProps {
  article?: IArticle
  isLoading?: boolean
  className?: string
}

export function ArticleViewAuthor({ article, isLoading, className }: IArticleViewAuthorProps) {
  const imageClassName = 'w-9 h-9 rounded-full overflow-hidden mr-2'
  const { data } = useFetchUserById(article?.owner_id as EntityId)
  const user = data?.item
  const imageSrc = user?.image_src ? user.image_src : ''

  if (!article || !user || isLoading) {
    return (
      <div className={'flex items-center ' + className}>
        <div className={imageClassName + ' animate-pulse bg-gray bg-opacity-50'}> </div>
        <div>
          <div className="w-24 h-3 bg-opacity-50 animate-pulse bg-gray"></div>
          <div className="w-32 h-3 mt-1 bg-opacity-50 animate-pulse bg-gray "></div>
        </div>
      </div>
    )
  }

  return (
    <div className={'flex items-center ' + className}>
      {imageSrc ? (
        <div className={imageClassName + ' bg-gray bg-opacity-50'}>
          <img src={user?.image_src} alt="" className="object-cover w-full h-full" />
        </div>
      ) : (
        <div className={imageClassName + ' flex bg-gray bg-opacity-10'}>
          <UserIcon className="m-auto text-2xl text-gray dark:text-gray-300" />
        </div>
      )}

      <div>
        <div className="text-xs text-gray dark:text-gray-300">Автор:</div>
        <div className="text-sm font-semibold">
          {user.last_name} {user.first_name}
        </div>
      </div>
    </div>
  )
}
