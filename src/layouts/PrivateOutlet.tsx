import { useAuth as useAuthQuery } from '@/store/auth/auth.query'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export function PrivateOutlet() {
  const location = useLocation()
  const { data: auth, isLoading } = useAuthQuery()

  if (!auth || isLoading) {
    return null
  }

  if (!auth.isLogedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}
