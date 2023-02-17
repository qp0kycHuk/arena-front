import { useMemo } from 'react';
import { Uploader } from '@features/fileUploader';
import { toast } from '@lib/Toast';
import { ArticleEditContext, useArticleEditMainContext, useArticleEditUtilsContext } from './ArticleEdit.Context';
import { getFilePreview, getRandomUUID } from '@utils/index';
import { getFileItems } from '@utils/helpers/files';


export interface IArticleEditImagesProps { }

// control upload and remove images
export function ArticleEditImages({ }: IArticleEditImagesProps) {
    // const { uploadImages, removeImage } = useContext(ArticleEditContext)
    const { article, update } = useArticleEditMainContext()
    const { loadingStart, loadingEnd } = useArticleEditUtilsContext()


    const fileItems = useMemo(() => {
        return article?.files?.map((item) => ({
            id: item.id,
            src: item.src,
            title: item.name
        }))
    }, [article])



    async function changeHandler(fileItems: IFileItem[]) {
        const files = fileItems.map((item) => (item as Required<IFileItem>).file)

        loadingStart()
        const updatedFiles = await getFileItems(files)
        loadingEnd()

        update({
            files: [
                ...(article?.files || []),
                ...updatedFiles
            ]
        })
    }

    function removeHandler(fileItem: IFileItem) {
        update({
            files: article?.files?.filter((item) => item.id !== fileItem.id)
        })
    }



    return (
        <Uploader
            fileItems={fileItems}
            onChange={changeHandler}
            onRemove={removeHandler} >
            <div className="font-semibold">Дополнительные изображения</div>
        </Uploader>
    );
}


