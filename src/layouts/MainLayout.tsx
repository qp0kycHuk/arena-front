import { Suspense } from 'react'
import { Sidebar } from './Sidebar/Sidebar'
import { Header } from './Header/Header'
import { PrivateOutlet } from './PrivateOutlet'
import { PagePreloader } from '@components/PagePreloader/PagePreloader'
import { SidebarContextProvider } from './Sidebar/SidebarContext'

export function MainLayout() {
  return (
    <SidebarContextProvider>
      <div className="flex-grow ">
        <Header />
        <div className="flex items-start gap-8 p-4 xl:p-8">
          <Sidebar />
          <Suspense fallback={<PagePreloader />}>
            <PrivateOutlet />
          </Suspense>
        </div>
      </div>
    </SidebarContextProvider>
  )
}
