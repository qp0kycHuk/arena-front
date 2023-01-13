import { createSlice } from '@reduxjs/toolkit'
import { IUser, authApi } from './auth.api'
import { RootState } from '../index'


interface IAuthState {
    user: IUser | null
    token: string | null
}

const slice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null } as IAuthState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            authApi.endpoints.login.matchFulfilled,
            (state, { payload }) => {
                state.token = payload.token
                state.user = payload.user
            }
        )
    },
})

export default slice.reducer

export const getCurrentUser = (state: RootState) => state.auth.user