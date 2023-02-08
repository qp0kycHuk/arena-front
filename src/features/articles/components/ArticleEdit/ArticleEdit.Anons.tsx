import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useArticleControl } from '@store/articles';
import { Uploader, useUploader } from '@features/fileUploader';
import { useArticleEditMainContext, useArticleEditUtilsContext } from './ArticleEdit.Context';
import { getFilePreview, getRandomUUID } from '@utils/index';
import { ICreateRequest } from '@store/articles/articles.api';

export interface IArticleEditAnonsProps { }

export function ArticleEditAnons({ }: IArticleEditAnonsProps) {
    const { article, update } = useArticleEditMainContext()
    const { loadingStart, loadingEnd, getFormData } = useArticleEditUtilsContext()
    const { upsertArticle, createDraftArticle } = useArticleControl()
    const navigate = useNavigate();

    const fileItems = useMemo(() => article?.image_src ? ([{
        id: article?.id,
        src: article?.image_src,
        // title: article?.image,
    }]) : [], [article])
    console.log(article);


    async function changeHandler(fileItems: IFileItem[]) {
        const file = fileItems[0]?.file

        if (!file) {
            return;
        }

        const dataUrl = await getFilePreview(file)

        update({
            anons: file,
            image_src: dataUrl || '',
            image_delete: false
        })
    }

    async function removeImage() {
        if (!article?.id) return

        update({
            anons: undefined,
            image_src: undefined,
            image_delete: true
        })
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
        <Uploader
            multiple={false}
            fileItems={fileItems}
            onChange={changeHandler}
        >
            <div className="font-semibold">Анонсовое изображение</div>
        </Uploader>
    );
}