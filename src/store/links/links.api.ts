import { ILink } from '@models/Link'
import { EntitiesApi } from '@store/utils/EntitiesApi'

type CreateParams = keyof ILink
type UpdateParams = CreateParams
export type ICreateRequest = TypedFormData<CreateParams>
export type IUpdateRequest = TypedFormData<UpdateParams>

const ROOT_ENDPOINT_URL = process.env.REACT_APP_API_URL + '/api/links'

export const linksApi = new EntitiesApi<ILink, ICreateRequest, IUpdateRequest>({
  url: ROOT_ENDPOINT_URL,
})
