import { IFolder } from '@models/Folder'
import { createEntityApi } from '@store/utils/EntitesApi'

type CreateParams = 'owner_id' | 'name'
type UpdateParams = CreateParams | 'id' | 'image_delete'
export type ICreateRequest = TypedFormData<CreateParams>
export type IUpdateRequest = TypedFormData<UpdateParams>

const ROOT_ENDPOINT_URL = process.env.REACT_APP_API_URL + '/api/folders'

export const foldersApi = createEntityApi<IFolder, ICreateRequest, IUpdateRequest>({
  url: ROOT_ENDPOINT_URL,
})
