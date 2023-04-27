import { IPosition } from "@models/Position";
import { createEntitiesApi } from '@services/utils/createEntitiesApi';

type CreateParams = keyof IPosition
type UpdateParams = CreateParams
export type ICreateRequest = TypedFormData<CreateParams>
export type IUpdateRequest = TypedFormData<UpdateParams>

const ROOT_ENDPOINT_URL = process.env.REACT_APP_API_URL + '/api/positions'

export const positionsApi = createEntitiesApi<IPosition, ICreateRequest, IUpdateRequest>({
    url: ROOT_ENDPOINT_URL
})
