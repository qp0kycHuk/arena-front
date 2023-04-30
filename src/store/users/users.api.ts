import { IUser } from "@models/User";
import { EntitesApi } from '@store/utils/EntitesApi';

type CreateParams = keyof IUser | 'positions[]'
type UpdateParams = CreateParams | 'id' | 'image_delete'
export type ICreateRequest = TypedFormData<CreateParams>
export type IUpdateRequest = TypedFormData<UpdateParams>

const ROOT_ENDPOINT_URL = process.env.REACT_APP_API_URL + '/api/users'

export const usersApi = new EntitesApi<IUser, ICreateRequest, IUpdateRequest>({
    url: ROOT_ENDPOINT_URL
})
