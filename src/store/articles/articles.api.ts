import type { IArticle } from '@models/Article'
import { EntityId } from '@reduxjs/toolkit'
import { EntitiesApi, IEntitiesApiConfig, createEntityApi } from '@store/utils/EntitiesApi'
import { createRootApi } from '../utils/createRootApi'
import { getEntities, getIds } from '@/utils/helpers/entity'

type CreateParams =
  | 'owner_id'
  | 'content'
  | 'excerpt'
  | 'name'
  | 'image'
  | 'tags[]'
  | 'attachment[]'
  | 'parent_id'
  | 'folders[]'
  | 'links[]'
type UpdateParams = CreateParams | 'id' | 'image_delete'
export type ICreateRequest = TypedFormData<CreateParams>
export type IUpdateRequest = TypedFormData<UpdateParams>

const ROOT_ENDPOINT_URL = process.env.REACT_APP_API_URL + '/api/articles'

class ArticlesApi<EntityType, C, U> extends EntitiesApi<EntityType, C, U> {
  constructor(params: IEntitiesApiConfig) {
    super(params)
  }

  async fetchByUserId(id: EntityId) {
    return await this.rootApi().post(this.ROOT_ENDPOINT_URL + '/list', { id })
  }
}

export const articlesApi = {
  ...createEntityApi<IArticle, ICreateRequest, IUpdateRequest>({ url: ROOT_ENDPOINT_URL }),
  async fetchByUserId(userId: EntityId): Promise<IListResponse<IArticle> & IEntitiesAdapter<IArticle>> {
    const { data } = await createRootApi().post(ROOT_ENDPOINT_URL + '/list/', { id: userId })

    return {
      ...data,
      ids: getIds(data.items),
      entities: getEntities(data.items),
    }
  },
}
