import type { EntityId } from "@reduxjs/toolkit"
import type { AxiosResponse } from "axios";
import { createRootApi } from "./createRootApi";

// C - Create FormData type
// U - Update FormData type

interface IConfig {
    url: string
}

type UpsertResponse<EntityType> = AxiosResponse<IItemResponse<EntityType>, any>

export class EntitesApi<EntityType, C, U> {
    private ROOT_ENDPOINT_URL: string

    constructor({ url }: IConfig) {
        this.ROOT_ENDPOINT_URL = url
    }

    async fetch(): Promise<AxiosResponse<IListResponse<EntityType>, any>> {
        return await this.rootApi().get(this.ROOT_ENDPOINT_URL)
    }

    async create(formData: C): Promise<UpsertResponse<EntityType>> {
        return await this.rootApi().post(this.ROOT_ENDPOINT_URL, formData)
    }

    async update(formData: U): Promise<UpsertResponse<EntityType>> {
        (formData as FormData).append('_method', 'PUT')

        return await this.rootApi().post(this.ROOT_ENDPOINT_URL + '/' + (formData as FormData).get('id'), formData)
    }

    async fetchById(id: EntityId) {
        return await this.rootApi().get(this.ROOT_ENDPOINT_URL + '/' + id)
    }

    async remove(id: EntityId) {
        return await this.rootApi().delete(this.ROOT_ENDPOINT_URL + '/' + id)
    }

    private rootApi() {
        return createRootApi()
    }
}