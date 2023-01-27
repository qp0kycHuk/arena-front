import { useGenerateHtml } from '@features/editor';
import { IArticle } from '@models/Article';
import * as React from 'react';

export interface IArticleViewBodyProps {
    article?: IArticle
    isLoading?: boolean
}

export function ArticleViewBody({ article, isLoading }: IArticleViewBodyProps) {
    const htmlBody = useGenerateHtml(article?.content)

    if (!article || isLoading) {
        return (
            <div className='space-y-2'>
                <div className="h-3 bg-opacity-50 animate-pulse bg-gray w-[500px] "></div>
                <div className="w-64 h-3 bg-opacity-50 animate-pulse bg-gray "></div>
                <div className="h-3 bg-opacity-50 animate-pulse bg-gray w-96 "></div>
                <div className="w-64 h-3 bg-opacity-50 animate-pulse bg-gray "></div>
                <div className="h-3 bg-opacity-50 animate-pulse bg-gray w-96 "></div>
                <div className="w-64 h-3 bg-opacity-50 animate-pulse bg-gray "></div>
            </div>
        )
    }

    return (
        <div className='ProseMirror'
            dangerouslySetInnerHTML={{ __html: htmlBody }}></div>
    );
}
