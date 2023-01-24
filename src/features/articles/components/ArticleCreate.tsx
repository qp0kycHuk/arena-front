import * as React from 'react';
import { ICreateRequest, useCreateMutation } from '@store/articles/';
import { toast } from '@lib/Toast';
import { ArticleEdit } from './ArticleEdit';
import { ARTICLE_SUCCESS_UPDATE, ARTICLE_ERROR_UPDATE } from '../const/Text';

interface IArticleCreateProps { }

export function ArticleCreate(props: IArticleCreateProps) {
    const [create] = useCreateMutation()

    async function onSubmit(formData: ICreateRequest) {
        try {
            await create(formData as ICreateRequest)
            toast.success(ARTICLE_SUCCESS_UPDATE)
        } catch (error) {
            toast.error(ARTICLE_ERROR_UPDATE)
        }
    }

    return (
        <ArticleEdit onSubmit={onSubmit} />
    );
}
