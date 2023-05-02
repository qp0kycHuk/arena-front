import type { IArticle } from "@models/Article";
import { EntitesApi } from '@store/utils/EntitesApi';

type CreateParams = 'owner_id' | 'content' | 'excerpt' | 'name' | 'image' | 'tags[]' | 'attachment[]' | 'parent_id' | 'folders[]'
type UpdateParams = CreateParams | 'id' | 'image_delete'
export type ICreateRequest = TypedFormData<CreateParams>
export type IUpdateRequest = TypedFormData<UpdateParams>

const ROOT_ENDPOINT_URL = process.env.REACT_APP_API_URL + '/api/articles'

export const articlesApi = new EntitesApi<IArticle, ICreateRequest, IUpdateRequest>({ url: ROOT_ENDPOINT_URL })