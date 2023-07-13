import React from 'react'
import { Sidebar } from './Sidebar/Sidebar'
import { Header } from './Header/Header'
import { Suspense } from 'react'
import { PrivateOutlet } from './PrivateOutlet'
import { PagePreloader } from '@components/PagePreloader/PagePreloader'

type IMainLayoutProps = React.PropsWithChildren

export function MainLayout({ children }: IMainLayoutProps) {
  // return (<Redirect />)

  return (
    <div className="flex-grow ">
      <Header />
      <div className="flex items-start gap-8 p-8">
        <Sidebar />
        <Suspense fallback={<PagePreloader />}>
          <PrivateOutlet />
        </Suspense>
      </div>
    </div>
  )
}
