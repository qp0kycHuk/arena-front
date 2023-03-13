import { ITag } from '@models/Tag';
import { useAppDispatch, useAppSelector } from '../index';
import { ICreateRequest, IUpdateRequest } from "./tags.api"
import { createTag as create, fetchTagById, fetchTags, updateTag as update } from './tags.thunk';
import { tagsSlice, selectAll, selectById } from './tags.slice';
import { useEffect, useMemo } from 'react';
import { EntityId } from '@reduxjs/toolkit';

export function useTagControl() {
    const dispatch = useAppDispatch()

    async function updateTag(formData: IUpdateRequest) {
        const action = await dispatch(update(formData))
        return action.payload as ITag
    }

    async function createTag(formData: ICreateRequest) {
        const action = await dispatch(create(formData))
        return action.payload as ITag
    }

    async function upsertTag(formData: ICreateRequest | IUpdateRequest) {
        if ((formData as IUpdateRequest).get('id')) {
            return await updateTag(formData)
        } else {
            return await createTag(formData)
        }
    }

    function manualUpdateTag(updated: ITag) {
        dispatch(tagsSlice.actions.updateTag(updated))
    }

    return {
        upsertTag,
        updateTag,
        createTag,
        manualUpdateTag
    }
}

export const useFetchTags = () => {
    const tags = useAppSelector(({ tags }) => tags)
    const items = useAppSelector(selectAll)
    const dispatch = useAppDispatch()

    const result = useMemo(() => {
        return {
            ...tags,
            items
        }
    }, [tags, items])

    useEffect(() => {
        dispatch(fetchTags())
    }, [dispatch])

    return result
}

export const useFetchTagById = (id: EntityId) => {
    const tag = useAppSelector((state) => selectById(state, id))
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (id) {
            dispatch(fetchTagById(id))
        }
    }, [id, dispatch])

    return tag
}