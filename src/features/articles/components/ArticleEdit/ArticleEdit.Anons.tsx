import { useMemo } from 'react';
import { Uploader, useUploader } from '@features/fileUploader';
import { getErrorMessage } from '@hooks/useErrorMessage';
import { toast } from '@lib/Toast';
import { ICreateRequest, useArticleControl } from '@store/articles';
import { IArticle } from '@models/Article';
import { useAppDispatch } from '@store/index';
import { IUpdateRequest, articlesApi } from '@store/articles/articles.api';
import { useNavigate } from 'react-router-dom';

export interface IArticleEditAnonsProps {
    article?: IArticle
    getFormData(): ICreateRequest
    onStartTransition?(): void
    onEndTransition?(): void
}

export function ArticleEditAnons({
    article,
    getFormData,
    onStartTransition,
    onEndTransition }: IArticleEditAnonsProps
) {
    const dispatch = useAppDispatch()
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
        onStartTransition?.()

        const anons = fileItems[0]?.file

        if (!anons) {
            onEndTransition?.()
            return;
        }

        const formData: ICreateRequest = getFormData()
        formData.append('image', anons)

        const updatedArticle = await updateOrCreate(formData)
        if (!updatedArticle) return

        if (!article) {
            navigate('/articles/edit/' + updatedArticle.id)
        }

        onEndTransition?.()
    }

    async function removeImage() {
        if (!article) return
        onStartTransition?.()

        const formData: IUpdateRequest = getFormData()
        formData.append('image_delete', '1')
        formData.append('id', article.id.toString())

        // change article state manualy 
        // for interface changed before request fullfiled
        // for no refetch article
        // because article state separately files api
        const patchResult = dispatch(articlesApi.util.updateQueryData('getById', article.id.toString(), (draft) => {
            Object.assign(draft, {
                image: null,
                image_src: null
            })
        }))

        const updatedArticle = await updateOrCreate(formData)
        if (!updatedArticle) {
            patchResult.undo()
        }

        onEndTransition?.()
    }

    // create draft if no exist or update article
    async function updateOrCreate(formData: ICreateRequest) {
        let result
        if (article) {
            result = await upsertArticle(formData)
        } else {
            result = await createDraftArticle(formData)
        }

        const errorMessage = getErrorMessage((result as IResultWithError)?.error)

        if (errorMessage) {
            toast.error(errorMessage)
            onEndTransition?.()
            return
        }

        const updatedArticle = (result as IResultWithData<IArticle>).data
        return updatedArticle
    }

    return (
        <Uploader uploader={anonsUploader} >
            <div className="font-semibold">Анонсовое изображение</div>
        </Uploader>
    );
}