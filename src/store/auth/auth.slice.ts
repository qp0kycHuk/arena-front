import Cookies from 'js-cookie'
import { createSlice } from '@reduxjs/toolkit'
import { IUser, authApi } from './auth.api'
import { RootState, useAppSelector } from '../index'
import { useMemo } from 'react'


interface IAuthState {
    user: IUser | null
    token: string | null
    isLogedIn: boolean
}

const initialState: IAuthState = {
    user: null,
    token: Cookies.get(process.env.REACT_APP_CSRF_COOKIE_NAME as string) || null,
    isLogedIn: Cookies.get(process.env.REACT_APP_CSRF_COOKIE_NAME as string) ? true : false
}

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            authApi.endpoints.initCsrf.matchFulfilled,
            (state) => {
                state.token = Cookies.get(process.env.REACT_APP_CSRF_COOKIE_NAME as string) || null
            }
        )

        builder.addMatcher(
            authApi.endpoints.login.matchFulfilled,
            (state) => {
                state.isLogedIn = Cookies.get(process.env.REACT_APP_CSRF_COOKIE_NAME as string) ? true : false
            }
        )

        builder.addMatcher(
            authApi.endpoints.login.matchRejected,
            (state) => {
                state.isLogedIn = false
                state.token = null
            }
        )

        builder.addMatcher(
            authApi.endpoints.user.matchFulfilled,
            (state, { payload }) => {
                state.user = payload
            }
        )
    },
})

export default slice.reducer

