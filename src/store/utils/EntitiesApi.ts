import { AxiosRequestConfig } from 'axios'
import { createRootApi } from './createRootApi'
import { getEntities, getIds } from '@utils/helpers/entity'

// C - Create FormData type
// U - Update FormData type
// F - Fetch params

export interface IEntitiesApiConfig {
  url: string
}

// for react query
export function createEntityApi<EntityType, C, U, F = Record<string, string>>({
  url,
}: IEntitiesApiConfig): IEntityApi<EntityType, C, U, F> {
  const fetch = async (params: F | null = {} as F, config = {}) => {
    const { data } = await createRootApi().get(url, { params, ...config })

    return {
      ...data,
      ids: getIds(data.items),
      entities: getEntities(data.items),
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

  const fetchById = async (id: EntityId, params: F | null = {} as F, config = {}) => {
    const { data } = await createRootApi().get(url + '/' + id, { params, ...config })

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

export interface IEntityApi<EntityType, C, U, F> {
  fetch: (
    params?: F | null,
    config?: AxiosRequestConfig<any>
  ) => Promise<IListResponse<EntityType> & IEntitiesAdapter<EntityType>>
  create: (formData: C) => Promise<IItemResponse<EntityType>>
  update: (formData: U) => Promise<IItemResponse<EntityType>>
  upsert: (formData: U | C) => Promise<IItemResponse<EntityType>>
  fetchById: (id: EntityId, params?: F | null, config?: AxiosRequestConfig<any>) => Promise<IItemResponse<EntityType>>
  remove: (id: EntityId) => Promise<unknown>
}
