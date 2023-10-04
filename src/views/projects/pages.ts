import { lazy } from 'react'

export const Projects = lazy(() => import('./components/Projects').then((m) => ({ default: m.Projects })))
