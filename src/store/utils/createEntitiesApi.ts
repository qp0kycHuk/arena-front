import { EntityId } from "@reduxjs/toolkit"
import { createRootApi } from "./createRootApi";
import { AxiosResponse } from "axios";

// E - Entity type
// C - Create FormData type
// U - Update FormData type

export interface IEntitiesApi<E, C, U> {
    create: (formData: C) => Promise<AxiosResponse<IItemResponse<E>, any>>;
    update: (formData: U) => Promise<AxiosResponse<IItemResponse<E>, any>>;
    fetch: () => Promise<AxiosResponse<IListResponse<E>, any>>;
    fetchById: (id: EntityId) => Promise<AxiosResponse<IItemResponse<E>, any>>;
    remove: (id: EntityId) => Promise<AxiosResponse<any, any>>;
}

export type IEntitiesApiCreator<E, C, U> = () => IEntitiesApi<E, C, U>

interface IConfig {
    url: string
}

export function createEntitiesApi<E, C, U>({
    url,
}: IConfig
): IEntitiesApiCreator<E, C, U> {
    const ROOT_ENDPOINT_URL = url

    return function api(): IEntitiesApi<E, C, U> {
        const api = createRootApi()

        async function fetch(): Promise<AxiosResponse<IListResponse<E>, any>> {
            return await api.get(ROOT_ENDPOINT_URL,)
        }

        async function create(formData: C): Promise<AxiosResponse<IItemResponse<E>, any>> {
            return await api.post(ROOT_ENDPOINT_URL, formData)
        }

        async function update(formData: U): Promise<AxiosResponse<IItemResponse<E>, any>> {
            (formData as FormData).append('_method', 'PUT')

            return await api.post(ROOT_ENDPOINT_URL + '/' + (formData as FormData).get('id'), formData)
        }

        async function fetchById(id: EntityId) {
            return await api.get(ROOT_ENDPOINT_URL + '/' + id)
        }

        async function remove(id: EntityId) {
            return await api.delete(ROOT_ENDPOINT_URL + '/' + id)
        }

        return {
            create,
            update,
            fetch,
            remove,
            fetchById
        }
    }
}