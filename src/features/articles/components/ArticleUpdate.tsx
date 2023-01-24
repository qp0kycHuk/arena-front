import * as React from 'react';
import { ICreateRequest, IUpdateRequest, useGetByIdQuery, useUpdateMutation } from '@store/articles/';
import { toast } from '@lib/Toast';
import { ArticleEdit } from './ArticleEdit';
import { ARTICLE_ERROR_UPDATE, ARTICLE_SUCCESS_UPDATE } from '../const/Text';

interface IArticleUpdateProps {
    articleId: string | number
}

export function ArticleUpdate({ articleId }: IArticleUpdateProps) {
    const [update] = useUpdateMutation()
    const { data: article } = useGetByIdQuery(articleId)

    async function onSubmit(formData: ICreateRequest) {
        const data = {
            ...formData,
            id: articleId
        }
        try {
            await update(data as IUpdateRequest)
            toast.success(ARTICLE_SUCCESS_UPDATE)
        } catch (error) {
            toast.error(ARTICLE_ERROR_UPDATE)
        }
    }

    return (<>
        {article ?
            <ArticleEdit onSubmit={onSubmit} article={article} />
            : 'Loading..'
        }
    </>);
}
