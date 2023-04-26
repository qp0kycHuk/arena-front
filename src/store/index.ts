
import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { rootApi } from './api'
import authReducer from './auth/auth.slice'
import positionsReducer from './positions/positions.slice'
import rolesReducer from './roles/roles.slice'
import tagsReducer from './tags/tags.slice'


export const store = configureStore({
    reducer: {
        [rootApi.reducerPath]: rootApi.reducer,
        auth: authReducer,
        positions: positionsReducer,
        roles: rolesReducer,
        tags: tagsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(rootApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()