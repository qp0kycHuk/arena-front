import { IArticle } from '@models/Article';
import { useAppDispatch, useAppSelector } from './../index';
import { ICreateRequest, IUpdateRequest } from "./articles.api"
import { createArticle as create, fetchArticleById, fetchArticles, updateArticle as update } from './articles.thunk';
import { articleSlice, selectAll, selectById } from './articles.slice';
import { useEffect } from 'react';
import { EntityId } from '@reduxjs/toolkit';

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

export const useFetchArticles = () => {
    const articles = useAppSelector(selectAll)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchArticles())
    }, [])

    return articles
}

export const useFetchArticleById = (id: EntityId) => {
    const article = useAppSelector((state) => selectById(state, id))
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (id) {
            dispatch(fetchArticleById(id))
        }
    }, [id])

    return article
}