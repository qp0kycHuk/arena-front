import { IArticle } from '@models/Article';
import { useAppDispatch } from './../index';
import { ICreateRequest, IUpdateRequest } from "./articles.api"
import { createArticle as create, updateArticle as update } from './articles.thunk';
import { articleSlice } from './articles.slice';

export function useArticleControl() {
    const dispatch = useAppDispatch()

    async function createDraftArticle(formData: ICreateRequest) {
        if (!formData.get('name')) {
            formData.append('name', '__DRAFT__')
        }

        const action = await dispatch(create(formData))
        return action.payload as IArticle
    }

    async function updateArticle(formData: IUpdateRequest) {
        const action = await dispatch(update(formData))
        return action.payload as IArticle
    }

    async function createArticle(formData: ICreateRequest) {
        const action = await dispatch(create(formData))
        return action.payload as IArticle
    }

    async function upsertArticle(formData: ICreateRequest | IUpdateRequest) {
        if ((formData as IUpdateRequest).get('id')) {
            return await updateArticle(formData)
        } else {
            return await createArticle(formData)
        }
    }

    function manualUpdateArticle(updated: IArticle) {
        dispatch(articleSlice.actions.updateArticle(updated))
    }

    return {
        upsertArticle,
        createDraftArticle,
        updateArticle,
        createArticle,
        manualUpdateArticle
    }
}