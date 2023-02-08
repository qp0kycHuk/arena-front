import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ICreateRequest, IUpdateRequest, useArticleControl } from '@store/articles';
import { Uploader, useUploader } from '@features/fileUploader';
import { useArticleEditMainContext, useArticleEditUtilsContext } from './ArticleEdit.Context';

export interface IArticleEditAnonsProps { }

export function ArticleEditAnons({ }: IArticleEditAnonsProps) {
    const { article } = useArticleEditMainContext()
    const { loadingStart, loadingEnd, getFormData } = useArticleEditUtilsContext()
    const { upsertArticle, createDraftArticle } = useArticleControl()
    const navigate = useNavigate();

    const initialImageFiles = useMemo(() => article?.image ? ([{
        id: article?.id,
        src: process.env.REACT_APP_API_URL + article?.image_src,
        title: article?.image,
    }]) : [], [article])

    const anonsUploader = useUploader({
        initialFiles: initialImageFiles,
        multiple: false,
        onChange: uploadImages,
        onRemove: removeImage
    })

    async function uploadImages(fileItems: IFileItem[]) {
        const anons = fileItems[0]?.file

        if (!anons) {
            return;
        }

        const formData: ICreateRequest = getFormData()
        formData.append('image', anons)
        loadingStart()
        const updatedArticle = await updateOrCreate(formData)
        loadingEnd()

        if (!updatedArticle) return

        if (!article) {
            navigate('/articles/edit/' + updatedArticle.id)
        }

    }

    async function removeImage() {
        if (!article) return

        const formData: IUpdateRequest = getFormData()
        formData.append('image_delete', '1')
        formData.append('id', article.id.toString())

        loadingStart()
        const updatedArticle = await updateOrCreate(formData)
        loadingEnd()
    }

    // create draft if no exist or update article
    async function updateOrCreate(formData: ICreateRequest) {
        if (article) {
            return await upsertArticle(formData)
        } else {
            return await createDraftArticle(formData)
        }
    }

    return (
        <Uploader uploader={anonsUploader} >
            <div className="font-semibold">Анонсовое изображение</div>
        </Uploader>
    );
}