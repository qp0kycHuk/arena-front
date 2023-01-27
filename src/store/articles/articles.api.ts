import { IArticle } from '@models/Article';
import { rootApi } from '../api'

interface IListResponse {
    items: IArticle[]
}

interface IItemResponse {
    item: IArticle
}

export interface ICreateRequest {
    user_id: number
    content: string
    excerpt: string
    name: string
}

export interface IUpdateRequest extends ICreateRequest {
    id: number | string
}

const ARTICLES_TAG: 'articles' = 'articles'
const ROOT_ENDPOINT_URL = 'api/articles'

const taggetRootApi = rootApi.enhanceEndpoints({ addTagTypes: [ARTICLES_TAG] });

export const articlesApi = taggetRootApi.injectEndpoints({
    endpoints: (builder) => ({
        get: builder.query<IArticle[], null>({
            query: () => ({
                url: ROOT_ENDPOINT_URL,

            }),
            transformResponse: (response: IListResponse) => {
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
            transformResponse: (response: IItemResponse) => {
                return response.item
            },
            providesTags: (result, error, id) => [{ type: ARTICLES_TAG, id }],
        }),
        create: builder.mutation<IArticle, ICreateRequest>({
            query: (body) => ({
                url: ROOT_ENDPOINT_URL,
                method: 'post',
                body
            }),
            transformResponse: (response: IItemResponse) => {
                return response.item
            },
            invalidatesTags: [{ type: ARTICLES_TAG, id: 'LIST' }]
        }),
        update: builder.mutation<IArticle, IUpdateRequest>({
            query: (body) => ({
                url: ROOT_ENDPOINT_URL + '/' + body.id,
                method: 'put',
                body: {
                    ...body,
                    _method: 'PUT'
                }
            }),
            transformResponse: (response: IItemResponse) => {
                return response.item
            },
            // invalidatesTags: (result, error, { id }) => [{ type: ARTICLES_TAG, id }],
            async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
                try {
                    const { data: updatedArticle } = await queryFulfilled
                    dispatch(articlesApi.util.updateQueryData('getById', id, (draft) => {
                        Object.assign(draft, updatedArticle)
                    }))
                } catch (error) {

                }
            },
        }),
    }),
})

export const { useGetQuery, useGetByIdQuery, useLazyGetByIdQuery, useCreateMutation, useUpdateMutation } = articlesApi