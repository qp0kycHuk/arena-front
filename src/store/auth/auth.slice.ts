import Cookies from 'js-cookie'
import { createSlice } from '@reduxjs/toolkit'
import { authApi } from './auth.api'
import { IUser } from '@models/User'


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

function logoutHandler(state: IAuthState) {
    state.user = null
    state.isLogedIn = false
    state.token = null

    Cookies.remove(process.env.REACT_APP_CSRF_COOKIE_NAME as string)
    Cookies.remove(process.env.REACT_APP_CSRF_COOKIE_NAME as string)
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
            authApi.endpoints.register.matchFulfilled,
            (state) => {
                state.isLogedIn = Cookies.get(process.env.REACT_APP_CSRF_COOKIE_NAME as string) ? true : false
            }
        )

        builder.addMatcher(
            authApi.endpoints.login.matchFulfilled,
            (state) => {
                state.isLogedIn = Cookies.get(process.env.REACT_APP_CSRF_COOKIE_NAME as string) ? true : false
            }
        )
        
        builder.addMatcher(authApi.endpoints.login.matchRejected, logoutHandler)
        builder.addMatcher(authApi.endpoints.register.matchRejected, logoutHandler)
        builder.addMatcher(authApi.endpoints.logout.matchFulfilled, logoutHandler)
        builder.addMatcher(authApi.endpoints.user.matchRejected, logoutHandler)

        builder.addMatcher(
            authApi.endpoints.user.matchFulfilled,
            (state, { payload }) => {
                state.user = payload
            }
        )
    },
})

export default slice.reducer

