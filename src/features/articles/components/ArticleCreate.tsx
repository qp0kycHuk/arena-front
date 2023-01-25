import * as React from 'react';
import { ICreateRequest, useCreateMutation } from '@store/articles/';
import { toast } from '@lib/Toast';
import { ArticleRedactor } from './ArticleRedactor';
import { ARTICLE_SUCCESS_UPDATE, ARTICLE_ERROR_UPDATE } from '../const/Text';
import { useNavigate } from 'react-router-dom';

interface IArticleCreateProps { }

export function ArticleCreate(props: IArticleCreateProps) {
    const [create] = useCreateMutation()
    const navigate = useNavigate();

    async function onSubmit(formData: ICreateRequest) {
        try {
            const result = await create(formData as ICreateRequest)
            if ('data' in result) {
                const article = result.data
                navigate('/articles/edit/' + article.id)
                toast.success(ARTICLE_SUCCESS_UPDATE)
            }
        } catch (error) {
            toast.error(ARTICLE_ERROR_UPDATE)
        }
    }

    return (
        <ArticleRedactor onSubmit={onSubmit} />
    );
}
