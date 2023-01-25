import { lazy } from "react"

export const Login = lazy(() => import('../features/authorization/').then((m) => ({ default: m.Login })))
export const Registration = lazy(() => import('../features/authorization/').then((m) => ({ default: m.Registration })))

export const ArticleViewPage = lazy(() => import('../features/articles/').then((m) => ({ default: m.ArticleViewPage })))
export const ArticleListPage = lazy(() => import('../features/articles/').then((m) => ({ default: m.ArticleListPage })))
export const ArticleEditPage = lazy(() => import('../features/articles/').then((m) => ({ default: m.ArticleEditPage })))

export const Projects = lazy(() => import('./Projects').then((m) => ({ default: m.Projects })))
export const Home = lazy(() => import('./Home').then((m) => ({ default: m.Home })))

