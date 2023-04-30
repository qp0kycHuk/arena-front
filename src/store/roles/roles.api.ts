import { IRole } from "@models/Role";
import { EntitesApi } from '@store/utils/EntitesApi';

type CreateParams = keyof IRole
type UpdateParams = CreateParams
export type ICreateRequest = TypedFormData<CreateParams>
export type IUpdateRequest = TypedFormData<UpdateParams>

const ROOT_ENDPOINT_URL = process.env.REACT_APP_API_URL + '/api/roles'

export const rolesApi = new EntitesApi<IRole, ICreateRequest, IUpdateRequest>({
    url: ROOT_ENDPOINT_URL
})
