import { useAppDispatch } from './../index';
import { ICreateRequest, IUpdateRequest, useCreateMutation, useUpdateMutation } from "./articles.api"
import { createArticle as create, updateArticle as update } from './articles.thunk';

export function useArticleControl() {
    const dispatch = useAppDispatch()

    async function createDraftArticle(formData: ICreateRequest) {
        if (!formData.get('name')) {
            formData.append('name', '__DRAFT__')
        }

        const result = await dispatch(create(formData))
        return result
    }

    async function updateArticle(formData: IUpdateRequest) {
        const result = await dispatch(update(formData))
        return result
    }

    async function createArticle(formData: ICreateRequest) {
        const result = await dispatch(create(formData))
        return result
    }

    async function upsertArticle(formData: ICreateRequest | IUpdateRequest) {
        if ((formData as IUpdateRequest).get('id')) {
            return await updateArticle(formData)
        } else {
            return await createArticle(formData)
        }
    }

    return {
        upsertArticle,
        createDraftArticle,
        updateArticle,
        createArticle
    }
}