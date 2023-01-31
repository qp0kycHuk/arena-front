import { useMemo } from 'react';
import { Uploader, useUploader } from '@features/fileUploader';
import { getErrorMessage } from '@hooks/useErrorMessage';
import { toast } from '@lib/Toast';
import { ICreateRequest, useArticleControl } from '@store/articles';
import { IUploadRequest, useRemoveMutation, useUploadMutation } from '@store/files/files.api';
import { IArticle } from '@models/Article';
import { useAppDispatch } from '@store/index';
import { IUpdateRequest, articlesApi } from '@store/articles/articles.api';
import { getRandomUUID } from '@utils/index';

export interface IArticleEditAnonsProps {
    article?: IArticle
    getFormData(): ICreateRequest
    onUpload?(currentArticle: IArticle): void
    onRemove?(): void
    onStartTransition?(): void
    onEndTransition?(): void
}

export function ArticleEditAnons({
    article,
    getFormData,
    onUpload,
    onRemove,
    onStartTransition,
    onEndTransition }: IArticleEditAnonsProps
) {
    const dispatch = useAppDispatch()
    const { updateArticle, createDraftArticle } = useArticleControl()
    const [upload] = useUploadMutation()
    const [remove] = useRemoveMutation()


    const initialImageFiles = useMemo(() => article?.image ? ([{
        id: getRandomUUID(),
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

        let result
        if (!article) {
            result = await createDraftArticle(formData)
        } else {
            (formData as IUpdateRequest).append('id', article.id.toString())
            result = await updateArticle(formData)
        }

        const errorMessage = getErrorMessage((result as IResultWithError)?.error)

        if (errorMessage) {
            toast.error(errorMessage)
            onEndTransition?.()
            return
        }

        onEndTransition?.()
    }

    async function removeImage(fileItem: IFileItem) {
        if (!article) return
        onStartTransition?.()

        const formData = new FormData()

        formData.append('id', (fileItem as Required<IFileItem>).id.toString())
        formData.append('entity_id', article.id.toString())
        formData.append('entity', 'article')

        const patchResult = dispatch(articlesApi.util.updateQueryData('getById', article.id.toString(), (draft) => {
            Object.assign(draft, {
                files: article.files.filter((item) => item.id !== fileItem.id)
            })
        }))

        const result = await remove(formData)
        const errorMessage = getErrorMessage((result as IResultWithError)?.error)

        if (errorMessage) {
            toast.error(errorMessage)
            onEndTransition?.()
            patchResult.undo()
            return
        }

        onRemove?.()
        onEndTransition?.()
    }

    return (
        <Uploader uploader={anonsUploader} >
            <div className="font-semibold">Анонсовое изображение</div>
        </Uploader>
    );
}