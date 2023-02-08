import { useContext, useMemo } from 'react';
import { useAppDispatch } from '@store/index';
import { articlesApi } from '@store/articles/articles.api';
import { useRemoveMutation } from '@store/files';
import { Uploader, useUploader } from '@features/fileUploader';
import { getErrorMessage } from '@hooks/useErrorMessage';
import { toast } from '@lib/Toast';
import { ArticleEditContext, ArticleEditMainContext, useArticleEditMainContext, useArticleEditUtilsContext } from './ArticleEdit.Context';
import { articleSlice } from '@store/articles/articles.slice';

export interface IArticleEditImagesProps { }

// control upload and remove images
export function ArticleEditImages({ }: IArticleEditImagesProps) {
    const { uploadImages, removeImage } = useContext(ArticleEditContext)
    const { article } = useArticleEditMainContext()
    const { loadingStart, loadingEnd } = useArticleEditUtilsContext()

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



    return (
        <Uploader uploader={imageUploader} >
            <div className="font-semibold">Дополнительные изображения</div>
        </Uploader>
    );
}


