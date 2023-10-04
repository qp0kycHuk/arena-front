import type { EntityId } from '@reduxjs/toolkit'
import type { AxiosResponse } from 'axios'
import { createRootApi } from './createRootApi'
import { getEntities, getIds } from '@utils/helpers/entity'

// C - Create FormData type
// U - Update FormData type

export interface IEntitesApiConfig {
  url: string
}

type UpsertResponse<EntityType> = AxiosResponse<IItemResponse<EntityType>, unknown>

// for rtk
export class EntitesApi<EntityType, C, U> {
  protected ROOT_ENDPOINT_URL: string

  constructor({ url }: IEntitesApiConfig) {
    this.ROOT_ENDPOINT_URL = url
  }

  async fetch(): Promise<AxiosResponse<IListResponse<EntityType>, unknown>> {
    return await this.rootApi().get(this.ROOT_ENDPOINT_URL)
  }

  async create(formData: C): Promise<UpsertResponse<EntityType>> {
    return await this.rootApi().post(this.ROOT_ENDPOINT_URL, formData)
  }

  async update(formData: U): Promise<UpsertResponse<EntityType>> {
    ;(formData as FormData).append('_method', 'PUT')

    return await this.rootApi().post(this.ROOT_ENDPOINT_URL + '/' + (formData as FormData).get('id'), formData)
  }

  async fetchById(id: EntityId) {
    return await this.rootApi().get(this.ROOT_ENDPOINT_URL + '/' + id)
  }

  async remove(id: EntityId) {
    return await this.rootApi().delete(this.ROOT_ENDPOINT_URL + '/' + id)
  }

  protected rootApi() {
    return createRootApi()
  }
}

// for react query
export function createEntityApi<EntityType, C, U>({ url }: IEntitesApiConfig): IEntityApi<EntityType, C, U> {
  async function fetch(): Promise<IListResponse<EntityType> & IEntitesAdapter<EntityType>> {
    const { data } = await createRootApi().get(url)

    return {
      ...data,
      ids: getIds(data.items),
      entites: getEntities(data.items),
    }
  }

  async function create(formData: C): Promise<IItemResponse<EntityType>> {
    const { data } = await createRootApi().post(url, formData)
    return data
  }

  async function update(formData: U): Promise<IItemResponse<EntityType>> {
    ;(formData as FormData).append('_method', 'PUT')

    const { data } = await createRootApi().post(url + '/' + (formData as FormData).get('id'), formData)
    return data
  }

  async function upsert(formData: U | C): Promise<IItemResponse<EntityType>> {
    if ((formData as FormData).get('id')) {
      return update(formData as U)
    } else {
      return create(formData as C)
    }
  }

  async function fetchById(id: EntityId): Promise<IItemResponse<EntityType>> {
    const { data } = await createRootApi().get(url + '/' + id)

    return data
  }

  async function remove(id: EntityId) {
    const { data } = await createRootApi().delete(url + '/' + id)
    return data
  }

  return {
    fetch,
    create,
    update,
    upsert,
    fetchById,
    remove,
  }
}

export interface IEntityApi<EntityType, C, U> {
  fetch: () => Promise<IListResponse<EntityType> & IEntitesAdapter<EntityType>>
  create: (formData: C) => Promise<IItemResponse<EntityType>>
  update: (formData: U) => Promise<IItemResponse<EntityType>>
  upsert: (formData: U | C) => Promise<IItemResponse<EntityType>>
  fetchById: (id: EntityId) => Promise<IItemResponse<EntityType>>
  remove: (id: EntityId) => Promise<unknown>
}
