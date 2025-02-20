import type { IArticle } from '@models/Article'
import { createEntityApi } from '@store/utils/EntitiesApi'
import { createRootApi } from '../utils/createRootApi'
import { getEntities, getIds } from '@/utils/helpers/entity'

const ROOT_ENDPOINT_URL = import.meta.env.VITE_API_URL + '/api/articles'

// class ArticlesApi<EntityType, C, U> extends EntitiesApi<EntityType, C, U> {
//   constructor(params: IEntitiesApiConfig) {
//     super(params)
//   }
// }

export const articlesApi = {
  ...createEntityApi<IArticle, ICreateRequest, IUpdateRequest, IFetchParams>({ url: ROOT_ENDPOINT_URL }),

  async fetchByUserId(userId: EntityId): Promise<IListResponse<IArticle> & IEntitiesAdapter<IArticle>> {
    const { data } = await createRootApi().post(ROOT_ENDPOINT_URL + '/list/', { id: userId })

    return {
      ...data,
      ids: getIds(data.items),
      entities: getEntities(data.items),
    }
  },
}

type CreateParams =
  | 'content'
  | 'excerpt'
  | 'name'
  | 'image'
  | 'tags[]'
  | 'attachment[]'
  | 'docs[]'
  | 'parent_id'
  | 'folders[]'
  | 'links[]'
type UpdateParams = CreateParams | 'id' | 'image_delete'
export type ICreateRequest = TypedFormData<CreateParams>
export type IUpdateRequest = TypedFormData<UpdateParams>
export type IFetchParams = {
  name?: string
}
