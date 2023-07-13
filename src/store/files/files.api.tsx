import { IFile } from '@models/File'
import { createRootApi } from '@store/utils/createRootApi'
import { AxiosResponse } from 'axios'

const ROOT_ENDPOINT_URL = process.env.REACT_APP_API_URL + '/api/files'

type UploadParams = 'files[]'
export type IUploadRequest = TypedFormData<UploadParams>

export function filesApi() {
  const api = createRootApi()

  async function upload(formData: IUploadRequest): Promise<AxiosResponse<IListResponse<IFile>, any>> {
    return await api.post(ROOT_ENDPOINT_URL, formData)
  }

  return {
    upload,
  }
}
