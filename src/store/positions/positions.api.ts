import { IPosition } from '@models/Position'
import { createEntityApi } from '@store/utils/EntitiesApi'

type CreateParams = keyof IPosition
type UpdateParams = CreateParams
export type ICreateRequest = TypedFormData<CreateParams>
export type IUpdateRequest = TypedFormData<UpdateParams>

const ROOT_ENDPOINT_URL = import.meta.env.VITE_API_URL + '/api/positions'

export const positionsApi = createEntityApi<IPosition, ICreateRequest, IUpdateRequest>({
  url: ROOT_ENDPOINT_URL,
})
