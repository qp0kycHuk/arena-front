import { EntityId } from "@reduxjs/toolkit"
import { useEffect, useMemo, useState } from "react"
import { useLoading } from '@hooks/useLoading';
import { IEntitiesApiCreator } from "./createEntitiesApi";
import { AxiosError } from "axios";

interface IOptions<E, C, U> {
    api: IEntitiesApiCreator<E, C, U>
    onCreate?(item: E): any
    onUpdate?(item: E): any
}

export function createHooks<E, C, U>({ api, onCreate, onUpdate }: IOptions<E, C, U>) {

    function useFetchEntities() {
        const { loading, loadingStart, loadingEnd } = useLoading(true)
        const [error, setError] = useState<IErrorData>()
        const [items, setItems] = useState<E[]>([])

        const load = async () => {
            loadingStart()
            try {
                const response = await api().fetch()
                setItems(response.data.items)
            } catch (err) {
                setError((err as AxiosError<IErrorData>).response?.data)
            }
            loadingEnd()
        }

        useEffect(() => {
            load()
        }, [])


        // const result = useMemo(() => ({
        //     items,
        //     loading,
        //     error,
        //     load
        // }), [items, loading])

        const result = {
            items,
            loading,
            error,
            load
        }

        return result
    }

    function useFetchEntityById(id: EntityId) {
        const { loading, loadingStart, loadingEnd } = useLoading(true)
        const [error, setError] = useState<IErrorData>()
        const [item, setItem] = useState<E>()


        const load = async () => {
            if (id) {
                loadingStart()
                try {
                    const response = await api().fetchById(id)
                    setItem(response.data.item)
                } catch (err) {
                    setError((err as AxiosError<IErrorData>).response?.data)
                }
                loadingEnd()
            }
        }

        useEffect(() => {
            load()
        }, [id])

        // const result = useMemo(() => ({
        //     item,
        //     loading
        // }), [item, loading])

        const result = {
            item,
            loading,
            error,
            load
        }

        return result
    }

    function useEntitiesControl() {

        async function remove(id: EntityId) {
            return await api().remove(id)
        }

        async function update(formData: U) {
            const response = await api().update(formData)
            onUpdate?.(response.data.item)
            return response.data.item
        }

        async function create(formData: C) {
            const response = await api().create(formData)
            onCreate?.(response.data.item)
            return response.data.item
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

    return {
        useFetchEntities,
        useFetchEntityById,
        useEntitiesControl
    }
}