import { IArticle } from '@models/Article';
import * as React from 'react';

interface IArticleViewImageProps {
    article?: IArticle
    isLoading?: boolean
}

export function ArticleViewImage({ article, isLoading }: IArticleViewImageProps) {
    const imageClassName = 'self-start h-20 mr-6 overflow-hidden rounded-xl w-28'

    if (!article || isLoading) {
        return (
            <div className={imageClassName + " animate-pulse bg-gray bg-opacity-50"}> </div>
        )
    }

    return (
        <div className={imageClassName}>
            <img src={article?.image || '/img/test.jpg'} alt="" className='object-cover w-full h-full' />
        </div>
    );
}
