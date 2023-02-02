import { ITag } from '@models/Tag';
import { rootApi } from '../api'
import { EntityState, createEntityAdapter } from '@reduxjs/toolkit';

export type ICreateRequest = TypedFormData<'name'>

const TAGS_TAG: 'tags' = 'tags'
const ROOT_ENDPOINT_URL = '/api/tags'

const taggetRootApi = rootApi.enhanceEndpoints({ addTagTypes: [TAGS_TAG] });
export const tagsEntityAdapter = createEntityAdapter<ITag>()

export const tagApi = taggetRootApi.injectEndpoints({
    endpoints: (builder) => ({
        getTags: builder.query<EntityState<ITag>, null>({
            query: () => {
                return {
                    url: ROOT_ENDPOINT_URL,

                }
            },
            transformResponse: (response: IListResponse<ITag>) => {
                return tagsEntityAdapter.setAll(
                    tagsEntityAdapter.getInitialState(),
                    response.items
                )
            },
            providesTags: (result) => {
                if (result) {
                    return [
                        ...result.ids.map((id) => ({ type: TAGS_TAG, id })),
                        { type: TAGS_TAG, id: 'LIST' },
                    ]
                }

                return [{ type: TAGS_TAG, id: 'LIST' }]
            }
        }),
        getTagById: builder.query<ITag, number | string>({
            query: (id) => ({
                url: ROOT_ENDPOINT_URL + '/' + id,
            }),
            transformResponse: (response: IItemResponse<ITag>) => {
                return response.item
            },
            providesTags: (result, error, id) => [{ type: TAGS_TAG, id: id.toString() }],

        }),
        createTag: builder.mutation<ITag, ICreateRequest>({
            query: (formData) => ({
                url: ROOT_ENDPOINT_URL,
                method: 'post',
                body: formData
            }),
            transformResponse: (response: IItemResponse<ITag>) => {
                return response.item
            },
            async onQueryStarted(formData, { dispatch, queryFulfilled }) {
                try {
                    const { data: newTag } = await queryFulfilled
                    dispatch(tagApi.util.updateQueryData('getTags', null, (draft) => {
                        tagsEntityAdapter.upsertOne(draft, newTag)
                    }))
                } catch (error) { }
            },
        }),
    }),
})

export const { useGetTagsQuery, useGetTagByIdQuery, useCreateTagMutation } = tagApi