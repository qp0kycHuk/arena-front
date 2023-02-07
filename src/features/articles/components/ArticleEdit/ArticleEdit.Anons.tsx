import { useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ICreateRequest, IUpdateRequest, useArticleControl } from '@store/articles';
import { articlesApi } from '@store/articles/articles.api';
import { Uploader, useUploader } from '@features/fileUploader';
import { getErrorMessage } from '@hooks/useErrorMessage';
import { toast } from '@lib/Toast';
import { useAppDispatch } from '@store/index';
import { IArticle } from '@models/Article';
import { ArticleEditContext, useArticleEditMainContext, useArticleEditUtilsContext } from './ArticleEdit.Context';

export interface IArticleEditAnonsProps { }

export function ArticleEditAnons({ }: IArticleEditAnonsProps) {
    const { article } = useArticleEditMainContext()
    const { loadingStart, loadingEnd, getFormData } = useArticleEditUtilsContext()

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
        loadingStart()

        const anons = fileItems[0]?.file

        if (!anons) {
            loadingEnd()
            return;
        }

        const formData: ICreateRequest = getFormData()
        formData.append('image', anons)

        const updatedArticle = await updateOrCreate(formData)
        // if (!updatedArticle) return

        // if (!article) {
        //     navigate('/articles/edit/' + updatedArticle.id)
        // }

        loadingEnd()
    }

    async function removeImage() {
        if (!article) return
        loadingStart()

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
        // if (!updatedArticle) {
        //     patchResult.undo()
        // }

        loadingEnd()
    }

    // create draft if no exist or update article
    async function updateOrCreate(formData: ICreateRequest) {
        let result
        
        if (article) {
            result = await upsertArticle(formData)
        } else {
            result = await createDraftArticle(formData)
        }

        const updatedArticle = result.payload as IArticle

        return updatedArticle
    }

    return (
        <Uploader uploader={anonsUploader} >
            <div className="font-semibold">Анонсовое изображение</div>
        </Uploader>
    );
}