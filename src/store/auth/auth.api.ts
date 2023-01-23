import { rootApi } from '../api'

export interface IUser {
    id: string
    name: string
    email: string
}

export interface ILoginRequest {
    phone: string
    password: string
}

const LOGIN_ENDPOINT_URL = 'api/login'
const USER_ENDPOINT_URL = 'api/user'
const CSRF_ENDPOINT_URL = 'sanctum/csrf-cookie'
const AUTH_TAG = 'Auth'

const taggetRootApi = rootApi.enhanceEndpoints({ addTagTypes: [AUTH_TAG] });

export const authApi = taggetRootApi.injectEndpoints({
    endpoints: (builder) => ({
        initCsrf: builder.query({
            query: () => ({
                url: CSRF_ENDPOINT_URL,
            })
        }),
        login: builder.mutation<null, ILoginRequest>({
            query: (credentials) => ({
                url: LOGIN_ENDPOINT_URL,
                method: 'POST',
                body: credentials
            }),
            invalidatesTags: [AUTH_TAG]
        }),
        user: builder.query<IUser, any>({
            query: () => ({
                url: USER_ENDPOINT_URL,
            })
        }),

    }),
})

export const { useLoginMutation, useInitCsrfQuery, useLazyInitCsrfQuery, useUserQuery } = authApi