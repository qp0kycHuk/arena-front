import { IFolder } from '@models/Folder'
import { createEntityApi } from '@store/utils/EntitiesApi'

type CreateParams = 'name'
type UpdateParams = CreateParams | 'id' | 'image_delete'
export type ICreateRequest = TypedFormData<CreateParams>
export type IUpdateRequest = TypedFormData<UpdateParams>
export type IFetchParams = {
  name?: string
  tags?: string[]
}

const ROOT_ENDPOINT_URL = process.env.REACT_APP_API_URL + '/api/folders'

export const foldersApi = createEntityApi<IFolder, ICreateRequest, IUpdateRequest, IFetchParams>({
  url: ROOT_ENDPOINT_URL,
})
