import { RootState } from './../index';
import { ActionCreatorWithoutPayload, AsyncThunk, EntityId, EntityState } from "@reduxjs/toolkit"
import { useAppDispatch, useAppSelector } from "../index"
import { useEffect } from "react"
import { useLoading } from '@hooks/useLoading';
import { EMPTY_OBJECT } from '@utils/const';

interface IOptions<E, C, U> {
    fetchAllThunk: AsyncThunk<E[], void, {}>
    updateThunk: AsyncThunk<E, U, {}>
    removeThunk: AsyncThunk<EntityId, EntityId, {}>
    createThunk: AsyncThunk<E, C, {}>
    fetchByIdThunk: AsyncThunk<E, EntityId, {}>
    selectEntitiesSelector(state: RootState): EntityState<E>
    selectAllSelector(state: RootState): E[]
    selectByIdSelector(state: RootState, id: EntityId): E | undefined
    clearEntitiesAction?: ActionCreatorWithoutPayload
}

interface IFetchParams {
    immediately?: boolean
    clear?: boolean
}

interface IFetchByIdParams {
    immediately?: boolean
}

export function createEntitiesHooks<E, C, U>({
    fetchAllThunk,
    updateThunk,
    removeThunk,
    createThunk,
    fetchByIdThunk,
    clearEntitiesAction,
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

    function useFetchEntities({ immediately = true, clear = true }: IFetchParams = EMPTY_OBJECT) {
        const { loading, loadingStart, loadingEnd } = useLoading(true)
        const { ids, entities } = useAppSelector(selectEntitiesSelector)
        const items = useAppSelector(selectAllSelector)
        const dispatch = useAppDispatch()

        const load = async () => {
            loadingStart()
            await dispatch(fetchAllThunk())
            loadingEnd()
        }

        useEffect(() => {
            if (immediately) {
                load()
            }
        }, [dispatch, immediately])

        useEffect(() => {
            if (clear && clearEntitiesAction) {
                dispatch(clearEntitiesAction())
            }
        }, [dispatch, clear, clearEntitiesAction])

        const result = {
            ids,
            entities,
            items,
            loading,
            load
        }

        return result
    }

    function useFetchEntityById(id: EntityId, { immediately = true }: IFetchByIdParams = EMPTY_OBJECT) {
        const { loading, loadingStart, loadingEnd } = useLoading(true)
        const entity = useAppSelector((state) => selectByIdSelector(state, id))
        const dispatch = useAppDispatch()


        const load = async () => {
            if (id) {
                loadingStart()
                await dispatch(fetchByIdThunk(id))
                loadingEnd()
            }
        }

        useEffect(() => {
            if (immediately) {
                load()
            }
        }, [id, dispatch, immediately])

        const result = {
            item: entity,
            loading,
            load
        }

        return result
    }

    return {
        useEntitiesControl,
        useFetchEntities,
        useFetchEntityById
    }
}