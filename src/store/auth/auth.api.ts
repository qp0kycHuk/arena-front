import { rootApi } from '../api'


export interface IUser {
    id: string
    name: string
    email: string
}

export interface IUserResponse {
    user: IUser
    token: string
}

export interface ILoginRequest {
    phone: string
    password: string
}

const LOGIN_ENDPOINT_URL = 'api/login'
const AUTH_TAG = 'Auth'

const taggetRootApi = rootApi.enhanceEndpoints({ addTagTypes: [AUTH_TAG] });

export const authApi = taggetRootApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<IUserResponse, ILoginRequest>({
            query: (credentials) => ({
                url: LOGIN_ENDPOINT_URL,
                method: 'POST',
                body: credentials,

            }),
            invalidatesTags: [AUTH_TAG]
        }),

    }),
})

export const { useLoginMutation } = authApi