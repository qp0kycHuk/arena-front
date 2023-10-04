import { lazy } from 'react'

export const UserListPage = lazy(() => import('./index').then((m) => ({ default: m.UserListPage })))
export const UserViewPage = lazy(() => import('./index').then((m) => ({ default: m.UserViewPage })))
export const UserEditPage = lazy(() => import('./index').then((m) => ({ default: m.UserEditPage })))
