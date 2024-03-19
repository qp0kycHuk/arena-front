import { IRole } from '@models/Role'
import { createEntityApi } from '@store/utils/EntitiesApi'

type CreateParams = keyof IRole
type UpdateParams = CreateParams
export type ICreateRequest = TypedFormData<CreateParams>
export type IUpdateRequest = TypedFormData<UpdateParams>

const ROOT_ENDPOINT_URL = import.meta.env.VITE_API_URL + '/api/roles'

export const rolesApi = createEntityApi<IRole, ICreateRequest, IUpdateRequest>({
  url: ROOT_ENDPOINT_URL,
})
