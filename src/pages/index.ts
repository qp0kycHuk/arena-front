import { lazy } from 'react'

export const Login = lazy(() => import('../views/authorization/').then((m) => ({ default: m.Login })))
export const Registration = lazy(() => import('../views/authorization/').then((m) => ({ default: m.Registration })))

// export const ArticleEditPage = lazy(() => import('../features/articles/').then((m) => ({ default: m.ArticleEditPage })))

export const HandbooksEditPage = lazy(() =>
  import('../views/handbooks/').then((m) => ({ default: m.HandbooksEditPage }))
)

export const Home = lazy(() => import('./Home').then((m) => ({ default: m.Home })))
export const NotFoundPage = lazy(() => import('./NotFoundPage').then((m) => ({ default: m.NotFoundPage })))
