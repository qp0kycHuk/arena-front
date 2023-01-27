import { IArticle } from '@models/Article';
import * as React from 'react';

interface IArticleViewDatesProps {
    article?: IArticle
    isLoading?: boolean
}

export function ArticleViewDates({ article, isLoading }: IArticleViewDatesProps) {
    const separatorClassName = 'my-2 border-t border-dashed border-gray opacity-30'

    if (!article || isLoading) {
        return (<>
            <div className="flex items-center">
                <div className="text-xs text-gray">Создано:</div>
                <div className="w-16 h-5 ml-auto bg-opacity-50 animate-pulse bg-gray"></div>
            </div>
            <div className={separatorClassName}></div>
            <div className="flex items-center">
                <div className="text-xs text-gray">Редактирование:</div>
                <div className="w-16 h-5 ml-auto bg-opacity-50 animate-pulse bg-gray"></div>
            </div>
        </>)
    }

    return (<>
        <div className="flex items-center">
            <div className="text-xs text-gray">Создано:</div>
            <div className="ml-auto text-sm font-semibold">{new Date(article?.created_at || '').toLocaleDateString()}</div>
        </div>
        <div className={separatorClassName}></div>
        <div className="flex items-center">
            <div className="text-xs text-gray">Редактирование:</div>
            <div className="ml-auto text-sm font-semibold">{new Date(article?.updated_at || '').toLocaleDateString()}</div>
        </div>
    </>);
}
