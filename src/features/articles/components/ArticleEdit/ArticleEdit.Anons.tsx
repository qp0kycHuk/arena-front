import { useMemo } from 'react';
import { Uploader } from '@features/fileUploader';
import { useArticleEditMainContext } from './ArticleEdit.Context';
import { getFilePreview, getRandomUUID } from '@utils/index';

export interface IArticleEditAnonsProps { }

export function ArticleEditAnons({ }: IArticleEditAnonsProps) {
    const { article, update } = useArticleEditMainContext()

    const fileItems = useMemo(() => article?.image_src ? ([{
        id: article?.id || getRandomUUID(),
        src: article?.image_src,
        // title: article?.image,
    }]) : [], [article])

    async function changeHandler(fileItems: IFileItem[]) {
        const file = fileItems[0]?.file

        if (!file) {
            return;
        }

        const dataUrl = await getFilePreview(file)

        update({
            imageFile: file,
            image_src: dataUrl || '',
            image_delete: false
        })
    }

    async function removeImage() {
        update({
            imageFile: undefined,
            image_src: undefined,
            image_delete: true
        })
    }

    return (
        <Uploader
            multiple={false}
            fileItems={fileItems}
            onChange={changeHandler}
            onRemove={removeImage}
        >
            <div className="font-semibold">Анонсовое изображение</div>
        </Uploader>
    );
}