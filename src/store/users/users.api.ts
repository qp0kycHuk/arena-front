import { IUser } from '@models/User'
import { createEntityApi } from '@store/utils/EntitiesApi'

type CreateParams = keyof IUser | 'positions[]'
type UpdateParams = CreateParams | 'id' | 'image_delete'
export type ICreateRequest = TypedFormData<CreateParams>
export type IUpdateRequest = TypedFormData<UpdateParams>

const ROOT_ENDPOINT_URL = import.meta.env.VITE_API_URL + '/api/users'

export const usersApi = createEntityApi<IUser, ICreateRequest, IUpdateRequest>({
  url: ROOT_ENDPOINT_URL,
})
