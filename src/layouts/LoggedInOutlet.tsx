import { useAuth } from '@/store/auth/auth.query'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export function LoggedInOutlet() {
  const { data: auth, isLoading } = useAuth()
  const location = useLocation()

  if (!auth || isLoading) {
    return null
  }

  if (auth.isLogedIn) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return <Outlet />
}
