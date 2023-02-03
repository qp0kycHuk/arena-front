import { useContext, useMemo } from 'react';
import { useAppDispatch } from '@store/index';
import { articlesApi } from '@store/articles/articles.api';
import { useRemoveMutation } from '@store/files';
import { Uploader, useUploader } from '@features/fileUploader';
import { getErrorMessage } from '@hooks/useErrorMessage';
import { toast } from '@lib/Toast';
import { ArticleEditContext, ArticleEditMainContext, useArticleEditMainContext, useArticleEditUtilsContext } from './ArticleEdit.Context';

export interface IArticleEditImagesProps { }

// control upload and remove images
export function ArticleEditImages({ }: IArticleEditImagesProps) {
    const { uploadImages } = useContext(ArticleEditContext)
    const { article } = useArticleEditMainContext()
    const { loadingStart, loadingEnd, getFormData } = useArticleEditUtilsContext()
    
    const dispatch = useAppDispatch()
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
        onChange: changeHandler,
        onRemove: removeImage
    })

    async function changeHandler(fileItems: IFileItem[]) {
        const files = fileItems.map((item) => (item as Required<IFileItem>).file)
        loadingStart()
        await uploadImages(files)
        loadingEnd()
    }

    async function removeImage(fileItem: IFileItem) {
        if (!article) return
        loadingStart()

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
                ...Object.fromEntries(getFormData()),
                files: article.files.filter((item) => item.id !== fileItem.id)
            })
        }))

        const result = await remove(formData)
        const errorMessage = getErrorMessage((result as IResultWithError)?.error)

        if (errorMessage) {
            toast.error(errorMessage)
            loadingEnd()
            patchResult.undo()
            return
        }

        loadingEnd()
    }

    return (
        <Uploader uploader={imageUploader} >
            <div className="font-semibold">Дополнительные изображения</div>
        </Uploader>
    );
}


