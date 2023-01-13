import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../index'


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

export const api = createApi({
    reducerPath: 'auth/api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL,
        prepareHeaders: (headers, { getState }) => {
            // By default, if we have a token in the store, let's use that for authenticated requests
            const token = (getState() as RootState).auth.token
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation<IUserResponse, ILoginRequest>({
            query: (credentials) => ({
                url: LOGIN_ENDPOINT_URL,
                method: 'POST',
                body: credentials,
                
            }),
        }),

    }),
})

export const { useLoginMutation } = api