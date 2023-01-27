import { IUser } from '@models/User'
import { rootApi } from '../api'

export interface ILoginRequest {
    phone: string
    password: string
}

export interface IRegisterRequest {
    first_name: string
    last_name: string
    phone: string
    password: string
    password_confirmation: string
}

const LOGIN_ENDPOINT_URL = 'api/login'
const REGISTER_ENDPOINT_URL = 'api/register'
const LOGOUT_ENDPOINT_URL = 'api/logout'
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
        register: builder.mutation<null, IRegisterRequest>({
            query: (credentials) => ({
                url: REGISTER_ENDPOINT_URL,
                method: 'POST',
                body: credentials
            }),
            invalidatesTags: [AUTH_TAG]
        }),
        logout: builder.mutation({
            query: () => ({
                url: LOGOUT_ENDPOINT_URL,
                method: 'POST',
            }),
            invalidatesTags: [AUTH_TAG]
        }),
        user: builder.query<IUser, any>({
            query: () => ({
                url: USER_ENDPOINT_URL,
            }),
        }),

    }),
})

export const { 
    useLoginMutation, 
    useRegisterMutation,
    useLogoutMutation,
    useInitCsrfQuery, 
    useLazyInitCsrfQuery, 
    useUserQuery } = authApi