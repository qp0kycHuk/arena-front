import { lazy } from 'react'

export const ArticleListPage = lazy(() => import('./index').then((m) => ({ default: m.ArticleListPage })))
export const ArticleViewPage = lazy(() => import('./index').then((m) => ({ default: m.ArticleViewPage })))
export const ArticleEditPage = lazy(() => import('./index').then((m) => ({ default: m.ArticleEditPage })))
