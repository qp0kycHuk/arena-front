import type { IArticle } from '@models/Article'
import { EntityId } from '@reduxjs/toolkit'
import { EntitesApi, IEntitesApiConfig, createEntityApi } from '@store/utils/EntitesApi'

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

class ArticlesApi<EntityType, C, U> extends EntitesApi<EntityType, C, U> {
  constructor(params: IEntitesApiConfig) {
    super(params)
  }

  async fetchByUserId(id: EntityId) {
    return await this.rootApi().post(this.ROOT_ENDPOINT_URL + '/list', { id })
  }
}

export const articlesApi = createEntityApi<IArticle, ICreateRequest, IUpdateRequest>({ url: ROOT_ENDPOINT_URL })
