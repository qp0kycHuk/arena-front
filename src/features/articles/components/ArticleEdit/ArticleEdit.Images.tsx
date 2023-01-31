import { useMemo } from 'react';
import { Uploader, useUploader } from '@features/fileUploader';
import { getErrorMessage } from '@hooks/useErrorMessage';
import { toast } from '@lib/Toast';
import { ICreateRequest, useArticleControl } from '@store/articles';
import { IUploadRequest, useRemoveMutation, useUploadMutation } from '@store/files/files.api';
import { IArticle } from '@models/Article';
import { useAppDispatch } from '@store/index';
import { articlesApi } from '@store/articles/articles.api';

export interface IArticleEditImagesProps {
    article?: IArticle
    getFormData(): ICreateRequest
    onUpload?(currentArticle: IArticle): void
    onRemove?(): void
    onStartTransition?(): void
    onEndTransition?(): void
}

export function ArticleEditImages({
    article,
    getFormData,
    onUpload,
    onRemove,
    onStartTransition,
    onEndTransition }: IArticleEditImagesProps
) {
    const dispatch = useAppDispatch()
    const { createDraftArticle } = useArticleControl()
    const [upload] = useUploadMutation()
    const [remove] = useRemoveMutation()

    const initialImageFiles = useMemo(() => {
        return article?.files.map((item) => ({
            id: item.id,
            src: process.env.REACT_APP_API_URL + item.src,
            title: item.name
        }))
    }, [article])

    const imageUploader = useUploader({
        initialFiles: initialImageFiles,
        onChange: uploadImages,
        onRemove: removeImage
    })

    async function uploadImages(fileItems: IFileItem[]) {
        let currentArticle = article
        onStartTransition?.()

        if (!article) {
            const createDraftResult = await createDraftArticle(getFormData())
            currentArticle = (createDraftResult as { data: IArticle; }).data

            const errorMessage = getErrorMessage((createDraftResult as IResultWithError)?.error)

            if (errorMessage) {
                toast.error(errorMessage)
                onEndTransition?.()
                return
            }
        }

        if (!currentArticle) {
            toast.error('currentArticle is undefined')
            onEndTransition?.()
            return
        }

        const files = fileItems.map((item) => (item as Required<IFileItem>).file)

        if (!files.length) {
            onEndTransition?.()
            return;
        }

        const formData: IUploadRequest = new FormData()
        formData.append('entity', 'article',)
        formData.append('entity_id', currentArticle.id.toString())
        files.forEach((file) => {
            formData.append('files[]', file)
        })

        const result = await upload(formData)
        const errorMessage = getErrorMessage((result as IResultWithError)?.error)

        if (errorMessage) {
            onEndTransition?.()
            toast.error(errorMessage)
            return
        }

        onUpload?.(currentArticle)
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
        <Uploader uploader={imageUploader} >
            <div className="font-semibold">Дополнительные изображения</div>
        </Uploader>
    );
}