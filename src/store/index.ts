
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/auth.slice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { rootApi } from './api'


export const store = configureStore({
    reducer: {
        [rootApi.reducerPath]: rootApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(rootApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()