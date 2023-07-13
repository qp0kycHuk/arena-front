import React, { Suspense } from 'react'
import background from '@assets/img/auth-background.jpg'
import { LoggedInOutlet } from './LoggedInOutlet'

export function AuthLayout() {
  return (
    <div className="flex flex-grow bg-cover" style={{ backgroundImage: 'url(' + background + ')' }}>
      <Suspense fallback="Loading..">
        <LoggedInOutlet />
      </Suspense>
    </div>
  )
}
