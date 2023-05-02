import Cookies from 'js-cookie'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { authApi } from './auth.api'
import { IUser } from '@models/User'
import { fetchUserById, updateUser } from '@store/users/users.thunk'

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

function authHandler(state: IAuthState) {
    state.token = Cookies.get(process.env.REACT_APP_CSRF_COOKIE_NAME as string) || null
    state.isLogedIn = state.token ? true : false
}

function logoutHandler(state: IAuthState) {
    state.user = null
    state.isLogedIn = false
    state.token = null

    Cookies.remove(process.env.REACT_APP_CSRF_COOKIE_NAME as string)
}

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateAuth(state, action: PayloadAction<IUser>) {
            state.user = action.payload
        }
    },
    extraReducers: (builder) => {
        const updateCurrentUser = (state: IAuthState, action: PayloadAction<IUser, string>) => {
            if (action.payload.id === state.user?.id) {
                state.user = {
                    ...state.user,
                    ...action.payload
                }
            }
        }
        builder
            .addCase(fetchUserById.fulfilled, updateCurrentUser)
            .addCase(updateUser.fulfilled, updateCurrentUser)

        builder.addMatcher(
            authApi.endpoints.initCsrf.matchFulfilled,
            (state) => {
                state.token = Cookies.get(process.env.REACT_APP_CSRF_COOKIE_NAME as string) || null
            }
        )

        builder.addMatcher(authApi.endpoints.register.matchFulfilled, authHandler)
        builder.addMatcher(authApi.endpoints.login.matchFulfilled, authHandler)

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

export const { updateAuth } = slice.actions

export default slice.reducer

