import { lazy } from 'react'

export const FavoriteListPage = lazy(() => import('./pages/List').then((m) => ({ default: m.FavoriteListPage })))
