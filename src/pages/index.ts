import { lazy } from "react"

export const Login = lazy(() => import('./Login').then((m) => ({ default: m.Login })))
export const Registration = lazy(() => import('./Registration').then((m) => ({ default: m.Registration })))
export const Projects = lazy(() => import('./Projects').then((m) => ({ default: m.Projects })))
export const ArticleView = lazy(() => import('./ArticleView').then((m) => ({ default: m.ArticleView })))
export const ArticleList = lazy(() => import('./ArticleList').then((m) => ({ default: m.ArticleList })))
export const ArticleEdit = lazy(() => import('./ArticleEdit').then((m) => ({ default: m.ArticleEdit })))
export const Home = lazy(() => import('./Home').then((m) => ({ default: m.Home })))

