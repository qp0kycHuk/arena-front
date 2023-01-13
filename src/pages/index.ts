import { lazy } from "react"

export const Login = lazy(() => import('./Login').then((m) => ({ default: m.Login })))
export const Registration = lazy(() => import('./Registration').then((m) => ({ default: m.Registration })))
export const Projects = lazy(() => import('./Projects').then((m) => ({ default: m.Projects })))
export const Edit = lazy(() => import('./Edit').then((m) => ({ default: m.Edit })))
export const Home = lazy(() => import('./Home').then((m) => ({ default: m.Home })))

