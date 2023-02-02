import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@store/index';
import { ICreateRequest, useArticleControl } from '@store/articles';
import { articlesApi } from '@store/articles/articles.api';
import { IUploadRequest, useRemoveMutation, useUploadMutation } from '@store/files';
import { Uploader, useUploader } from '@features/fileUploader';
import { getErrorMessage } from '@hooks/useErrorMessage';
import { toast } from '@lib/Toast';
import { IArticle } from '@models/Article';
import { IFile } from '@models/File';

export interface IArticleEditImagesProps {
    article?: IArticle
    getFormData(): ICreateRequest
    onStartTransition?(): void
    onEndTransition?(): void
}

// control upload and remove images
export function ArticleEditImages({
    article,
    getFormData,
    onStartTransition,
    onEndTransition }: IArticleEditImagesProps
) {
    const dispatch = useAppDispatch()
    const { createDraftArticle } = useArticleControl()
    const [upload] = useUploadMutation()
    const [remove] = useRemoveMutation()
    const navigate = useNavigate();

    const initialImageFiles = useMemo(() => {
        return article?.files.map((item) => ({
            id: item.id,
            src: process.env.REACT_APP_API_URL + item.src,
            title: item.name
        }))
    }, [article])

    const imageUploader = useUploader({
        initialFiles: initialImageFiles,
        onChange: changeHandler,
        onRemove: removeImage
    })

    async function changeHandler(fileItems: IFileItem[]) {
        const files = fileItems.map((item) => (item as Required<IFileItem>).file)
        onStartTransition?.()
        uploadImages(files, article)
        onEndTransition?.()
    }

    async function uploadImages(files: File[], article?: IArticle) {
        // check files
        if (!files.length) return;
        let currentArticle = article

        // Create draft article if article not exist
        if (!article) {
            const createDraftResult = await createDraftArticle(getFormData())
            currentArticle = (createDraftResult as { data: IArticle; }).data
            const errorMessage = getErrorMessage((createDraftResult as IResultWithError)?.error)

            if (errorMessage) {
                toast.error(errorMessage)
                return
            }
        }

        if (!currentArticle) {
            toast.error('currentArticle is undefined')
            return
        }

        // create form data
        const formData: IUploadRequest = new FormData()
        formData.append('entity', 'article',)
        formData.append('entity_id', currentArticle.id.toString())
        files.forEach((file) => {
            formData.append('files[]', file)
        })

        // upload files
        const result = await upload(formData)
        const errorMessage = getErrorMessage((result as IResultWithError)?.error)

        if (errorMessage) {
            toast.error(errorMessage)
            return
        }

        // change article state manualy 
        // for no refetch article
        // because article state separately files api
        dispatch(articlesApi.util.updateQueryData('getById', currentArticle.id.toString(), (draft) => {
            Object.assign(draft, {
                files: [
                    ...draft.files,
                    ...(result as IResultWithData<IFile[]>).data
                ]
            })
        }))

        if (!article) {
            navigate('/articles/edit/' + currentArticle.id)
        }
    }

    async function removeImage(fileItem: IFileItem) {
        if (!article) return
        onStartTransition?.()

        const formData = new FormData()
        formData.append('id', (fileItem as Required<IFileItem>).id.toString())
        formData.append('entity_id', article.id.toString())
        formData.append('entity', 'article')

        // change article state manualy 
        // for interface changed before request fullfiled
        // for no refetch article
        // because article state separately files api
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

        onEndTransition?.()
    }

    return (
        <Uploader uploader={imageUploader} >
            <div className="font-semibold">Дополнительные изображения</div>
        </Uploader>
    );
}


