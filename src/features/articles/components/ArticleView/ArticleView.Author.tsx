import { ImageIcon } from "@assets/icons/stroke";
import { IArticle } from "@models/Article";
import { EntityId } from "@reduxjs/toolkit";
import { useFetchUserById } from "@store/users/users.hooks";

interface IArticleViewAuthorProps {
    article?: IArticle
    isLoading?: boolean
    className?: string
}

export function ArticleViewAuthor({ article, isLoading, className }: IArticleViewAuthorProps) {
    const imageClassName = 'w-9 h-9 rounded-full overflow-hidden mr-2'
    const { item: user } = useFetchUserById(article?.user_id as EntityId)
    const imageSrc = user?.image_src ? user.image_src : ''

    if (!article || !user || isLoading) {
        return (
            <div className={'flex items-center ' + className}>
                <div className={imageClassName + " animate-pulse bg-gray bg-opacity-50"}> </div>
                <div>
                    <div className="w-24 h-3 bg-opacity-50 animate-pulse bg-gray"></div>
                    <div className="w-32 h-3 mt-1 bg-opacity-50 animate-pulse bg-gray "></div>
                </div>
            </div>
        )
    }

    return (
        <div className={'flex items-center ' + className}>
            {
                imageSrc ?
                    <div className={imageClassName + ' bg-gray bg-opacity-50'}>
                        <img src={user?.image_src} alt="" className="object-cover w-full h-full" />
                    </div>
                    :
                    <div className={imageClassName + ' bg-gray bg-opacity-10'}>
                        <ImageIcon className="m-auto text-2xl text-gray" />
                    </div>
            }

            <div>
                <div className="text-xs text-gray">Автор:</div>
                <div className="text-sm font-semibold">{user.last_name} {user.first_name}</div>
            </div>
        </div>
    );
}