import { IArticle } from '@models/Article';
import { rootApi } from '../api'


type CreateParams = 'user_id' | 'content' | 'excerpt' | 'name' | 'image' | 'tags[]'
type UpdateParams = CreateParams | 'id'| 'image_delete'
export type ICreateRequest = TypedFormData<CreateParams>
export type IUpdateRequest = TypedFormData<UpdateParams>


const ARTICLES_TAG: 'articles' = 'articles'
const ROOT_ENDPOINT_URL = '/api/articles'

const taggetRootApi = rootApi.enhanceEndpoints({ addTagTypes: [ARTICLES_TAG] });

export const articlesApi = taggetRootApi.injectEndpoints({
    endpoints: (builder) => ({
        get: builder.query<IArticle[], null>({
            query: () => {
                return {
                    url: ROOT_ENDPOINT_URL,

                }
            },
            transformResponse: (response: IListResponse<IArticle>) => {
                return response.items
            },
            providesTags: (result) => {
                if (result) {
                    return [
                        ...result.map(({ id }) => ({ type: ARTICLES_TAG, id })),
                        { type: ARTICLES_TAG, id: 'LIST' },
                    ]
                }

                return [{ type: ARTICLES_TAG, id: 'LIST' }]
            }
        }),
        getById: builder.query<IArticle, number | string>({
            query: (id) => ({
                url: ROOT_ENDPOINT_URL + '/' + id,
            }),
            transformResponse: (response: IItemResponse<IArticle>) => {
                return response.item
            },
            providesTags: (result, error, id) => [{ type: ARTICLES_TAG, id: id.toString() }],

        }),
        create: builder.mutation<IArticle, ICreateRequest>({
            query: (formData) => ({
                url: ROOT_ENDPOINT_URL,
                method: 'post',
                body: formData
            }),
            transformResponse: (response: IItemResponse<IArticle>) => {
                return response.item
            },
            invalidatesTags: [{ type: ARTICLES_TAG, id: 'LIST' }]
        }),
        update: builder.mutation<IArticle, IUpdateRequest>({
            query: (formData) => {
                formData.append('_method', 'PUT')
                return {
                    url: ROOT_ENDPOINT_URL + '/' + formData.get('id'),
                    method: 'post',
                    body: formData
                }
            },
            transformResponse: (response: IItemResponse<IArticle>) => {
                return response.item
            },
            async onQueryStarted(formData, { dispatch, queryFulfilled }) {
                try {
                    const { data: updatedArticle } = await queryFulfilled
                    dispatch(articlesApi.util.updateQueryData('getById', updatedArticle.id.toString(), (draft) => {
                        Object.assign(draft, updatedArticle)
                    }))
                    dispatch(articlesApi.util.updateQueryData('get', null, (draft) => {
                        const index = draft.findIndex((item) => item.id === updatedArticle.id)
                        if(draft[index]){
                            draft[index] = updatedArticle
                        }
                    }))
                } catch (error) { }
            },
        }),
    }),
})

export const { useGetQuery, useGetByIdQuery, useLazyGetByIdQuery, useCreateMutation, useUpdateMutation } = articlesApi