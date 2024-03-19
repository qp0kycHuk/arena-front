import { ILink } from '@models/Link'
import { createEntityApi } from '@store/utils/EntitiesApi'

type CreateParams = keyof ILink
type UpdateParams = CreateParams
export type ICreateRequest = TypedFormData<CreateParams>
export type IUpdateRequest = TypedFormData<UpdateParams>

const ROOT_ENDPOINT_URL = import.meta.env.VITE_API_URL + '/api/links'

export const linksApi = createEntityApi<ILink, ICreateRequest, IUpdateRequest>({
  url: ROOT_ENDPOINT_URL,
})
