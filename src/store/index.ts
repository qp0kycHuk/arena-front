import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { rootApi } from './api'
import authReducer from './auth/auth.slice'
// import articlesReducer from './articles/articles.slice'
// import foldersReducer from './folders/folders.slice'
// import usersReducer from './users/users.slice'
import positionsReducer from './positions/positions.slice'
import rolesReducer from './roles/roles.slice'
import tagsReducer from './tags/tags.slice'
import themeReducer from './theme/theme.slice'

export const store = configureStore({
  reducer: {
    [rootApi.reducerPath]: rootApi.reducer,
    auth: authReducer,
    // articles: articlesReducer,
    // folders: foldersReducer,
    // users: usersReducer,
    positions: positionsReducer,
    roles: rolesReducer,
    tags: tagsReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rootApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
