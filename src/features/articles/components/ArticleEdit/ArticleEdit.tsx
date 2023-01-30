import { ArticleUpdate } from './ArticleUpdate';
import { ArticleCreate } from './ArticleCreate';
import { ArticleRedactor } from './ArticleRedactor';
import { ICreateRequest, IUpdateRequest, useCreateMutation, useGetByIdQuery, useLazyGetByIdQuery, useUpdateMutation } from '@store/articles';
import { useNavigate } from 'react-router-dom';
import { ARTICLE_ERROR_CREATE, ARTICLE_ERROR_UPDATE, ARTICLE_SUCCESS_CREATE, ARTICLE_SUCCESS_UPDATE } from '@features/articles/const/Text';
import { toast } from '@lib/Toast';
import { IArticle } from '@models/Article';

export interface IArticleEditProps {
    articleId?: string | number
}

export function ArticleEdit({ articleId }: IArticleEditProps) {
    const [create] = useCreateMutation()
    const [update] = useUpdateMutation()
    const { data: article } = useGetByIdQuery(articleId || '')

    const navigate = useNavigate();

    async function onUpdate(formData: ICreateRequest) {
        const data = {
            ...formData,
            id: articleId
        }

        await update(data as IUpdateRequest)
            .then(() => {
                toast.success(ARTICLE_SUCCESS_UPDATE)
                navigate('/articles/' + articleId)
            })
            .catch(() => toast.error(ARTICLE_ERROR_UPDATE))

    }

    async function onCreate(formData: ICreateRequest) {
        await create(formData as ICreateRequest)
            .then((result) => {
                const article = (result as { data: IArticle; }).data
                navigate('/articles/' + article.id)
                toast.success(ARTICLE_SUCCESS_CREATE)
            })
            .catch(() => toast.error(ARTICLE_ERROR_CREATE))

    }

    return <ArticleRedactor onSubmit={articleId ? onUpdate : onCreate} article={article} />;
}
