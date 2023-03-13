import { RootState } from './../index';
import { AsyncThunk, EntityId, EntityState } from "@reduxjs/toolkit"
import { useAppDispatch, useAppSelector } from "../index"
import { useEffect, useMemo } from "react"

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
        const entitiesState = useAppSelector(selectEntitiesSelector)
        const items = useAppSelector(selectAllSelector)
        const dispatch = useAppDispatch()

        const result = useMemo(() => {
            return {
                ...entitiesState,
                items
            }
        }, [entitiesState, items])

        useEffect(() => {
            dispatch(fetchAllThunk())
        }, [dispatch])

        return result
    }

    function useFetchEntityById(id: EntityId) {
        const entity = useAppSelector((state) => selectByIdSelector(state, id))
        const dispatch = useAppDispatch()

        useEffect(() => {
            if (id) {
                dispatch(fetchByIdThunk(id))
            }
        }, [id, dispatch])

        return entity
    }

    return {
        useEntitiesControl,
        useFetchEntities,
        useFetchEntityById
    }
}