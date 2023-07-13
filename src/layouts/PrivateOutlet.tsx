import React from 'react'
import { useAuth, useUserQuery } from '@store/auth'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export function PrivateOutlet() {
  // initial user data load
  useUserQuery(null, {
    refetchOnMountOrArgChange: true,
  })
  const auth = useAuth()
  const location = useLocation()

  if (!auth.isLogedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}
