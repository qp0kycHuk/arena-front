import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IUser } from './auth.api'
import { RootState } from '../index'

interface IAuthState {
    user: IUser | null
    token: string | null
}

const slice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null } as IAuthState,
    reducers: {
        setCredentials: (state, action: PayloadAction<IAuthState>) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },
    },
})

export default slice.reducer

export const { setCredentials } = slice.actions

export const getCurrentUser = (state: RootState) => state.auth.user