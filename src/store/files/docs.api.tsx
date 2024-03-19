import { IFile } from '@models/File'
import { createRootApi } from '@store/utils/createRootApi'
import { AxiosResponse } from 'axios'

const ROOT_ENDPOINT_URL = import.meta.env.VITE_API_URL + '/api/docs'

type UploadParams = 'files[]'
export type IUploadRequest = TypedFormData<UploadParams>

export function docsApi() {
  const api = createRootApi()

  async function upload(formData: IUploadRequest): Promise<AxiosResponse<IListResponse<IFile>, unknown>> {
    return await api.post(ROOT_ENDPOINT_URL, formData)
  }

  return {
    upload,
  }
}
