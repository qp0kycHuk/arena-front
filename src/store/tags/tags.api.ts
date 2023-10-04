import { ITag } from '@models/Tag'
import { createEntityApi } from '@store/utils/EntitesApi'

type CreateParams = keyof ITag
type UpdateParams = CreateParams
export type ICreateRequest = TypedFormData<CreateParams>
export type IUpdateRequest = TypedFormData<UpdateParams>

const ROOT_ENDPOINT_URL = process.env.REACT_APP_API_URL + '/api/tags'

export const tagsApi = createEntityApi<ITag, ICreateRequest, IUpdateRequest>({
  url: ROOT_ENDPOINT_URL,
})
