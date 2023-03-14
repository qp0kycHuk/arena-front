import { RootState } from './../index';
import { AsyncThunk, EntityId, EntityState } from "@reduxjs/toolkit"
import { useAppDispatch, useAppSelector } from "../index"
import { useEffect, useMemo } from "react"
import { useLoading } from '@hooks/useLoading';

interface IOptions<E, C, U> {
    fetchAllThunk: AsyncThunk<E[], void, {}>
    updateThunk: AsyncThunk<E, U, {}>
    removeThunk: AsyncThunk<EntityId, EntityId, {}>
    createThunk: AsyncThunk<E, C, {}>
    fetchByIdThunk: AsyncThunk<E, EntityId, {}>
    selectEntitiesSelector(state: RootState): EntityState<E>
    selectAllSelector(state: RootState): E[]
    selectByIdSelector(state: RootState, id: EntityId): E | undefined
}

export function createEntitiesHooks<E, C, U>({
    fetchAllThunk,
    updateThunk,
    removeThunk,
    createThunk,
    fetchByIdThunk,
    selectEntitiesSelector,
    selectAllSelector,
    selectByIdSelector,
}: IOptions<E, C, U>) {
    function useEntitiesControl() {
        const dispatch = useAppDispatch()

        async function remove(id: EntityId) {
            return await dispatch(removeThunk(id))
        }

        async function update(formData: U) {
            const action = await dispatch(updateThunk(formData))
            return action.payload as E
        }

        async function create(formData: C) {
            const action = await dispatch(createThunk(formData))
            return action.payload as E
        }

        async function upsert(formData: C | U) {
            if ((formData as FormData).get('id')) {
                return await update(formData as U)
            } else {
                return await create(formData as C)
            }
        }

        return {
            upsert,
            update,
            create,
            remove,
        }
    }

    function useFetchEntities() {
        const { loading, loadingStart, loadingEnd } = useLoading(true)
        const entitiesState = useAppSelector(selectEntitiesSelector)
        const items = useAppSelector(selectAllSelector)
        const dispatch = useAppDispatch()

        const result = useMemo(() => ({
            ...entitiesState,
            items,
            loading
        }), [entitiesState, items, loading])

        useEffect(() => {
            const load = async () => {
                loadingStart()
                await dispatch(fetchAllThunk())
                loadingEnd()
            }
            load()
        }, [dispatch])

        return result
    }

    function useFetchEntityById(id: EntityId) {
        const { loading, loadingStart, loadingEnd } = useLoading(true)
        const entity = useAppSelector((state) => selectByIdSelector(state, id))
        const dispatch = useAppDispatch()

        const result = useMemo(() => ({
            item: entity,
            loading
        }), [entity, loading])

        useEffect(() => {
            const load = async () => {
                if (id) {
                    loadingStart()
                    await dispatch(fetchByIdThunk(id))
                    loadingEnd()
                }
            }
            load()
        }, [id, dispatch])

        return result
    }

    return {
        useEntitiesControl,
        useFetchEntities,
        useFetchEntityById
    }
}