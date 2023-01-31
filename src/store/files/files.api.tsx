import { rootApi } from '../api'
import { IFile } from '@models/File';

export type IUploadRequest = TypedFormData<'entity' | 'entity_id' | 'files[]'>
export type IRemoveRequest = TypedFormData<'id' | 'entity_id' | 'entity'>

const FILES_TAG: 'files' = 'files'
const ROOT_ENDPOINT_URL = '/api/files'

const taggetRootApi = rootApi.enhanceEndpoints({ addTagTypes: [FILES_TAG] });

export const filesApi = taggetRootApi.injectEndpoints({
    endpoints: (builder) => ({
        upload: builder.mutation<IFile[], IUploadRequest>({
            query: (body) => ({
                url: ROOT_ENDPOINT_URL,
                method: 'post',
                body
            }),
            transformResponse: (response: IListResponse<IFile>) => {
                return response.items
            },
            invalidatesTags: [{ type: FILES_TAG, id: 'LIST' }]
        }),
        remove: builder.mutation<null, IRemoveRequest>({
            query: (formData) => ({
                url: ROOT_ENDPOINT_URL + '/' + formData.get('id'),
                method: 'delete',
                // body: formData,
                params: {
                    entity: formData.get('entity'),
                    entity_id: formData.get('entity_id'),
                }
            })
        })
    }),
})

export const { useUploadMutation, useRemoveMutation } = filesApi