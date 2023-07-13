import React from 'react'
import { useAuth } from '@store/auth'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export function LoggedInOutlet() {
  const auth = useAuth()
  const location = useLocation()

  if (auth.isLogedIn) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return <Outlet />
}
