import { CrossIcon, CrownIcon, HandbooksIcon, UsersIcon } from '@assets/icons/stroke'
import { Button } from '@features/ui'
import { getRoute } from '@utils/index'
import { SidebarButton } from './SidebarButton'
import { Tags } from './Sidebar.Tags'
import { Folders } from './Sidebar.Folders'
import { useSidebarContext } from './SidebarContext'
import classNames from 'classnames'
import headerLogo from '@assets/img/header-logo.png'
import { isUser } from '@/views/users'
import { useAuth } from '@/store/auth'

export function Sidebar() {
  const { isOpen, closeSidebar } = useSidebarContext()
  const { data: auth } = useAuth()
  const currentUser = auth?.user
  const isCurrentUserRole = isUser(currentUser)

  return (
    <>
      <div className={classNames('sidebar', isOpen ? 'active' : null)}>
        <header className="sticky top-0 z-20 flex items-center px-3 xl:px-8 py-2 bg-l3 shadow-sm xl:hidden">
          <Button className="xl:hidden mr-1 sm:mr-3 -ml-2" size="sm" variant="text" onClick={closeSidebar}>
            <CrossIcon className="text-2xl" />
          </Button>
          <div className="mr-auto">
            <img src={headerLogo} alt="" className="h-[26px]" />
          </div>
        </header>
        <div className="sidebar-content">
          <div className="space-y-1">
            <SidebarButton title="Главная" icon={CrownIcon} link="/" />
            <SidebarButton title="Пользователи" icon={UsersIcon} link={getRoute().users()} />
            {/* <SidebarButton title="Статьи" icon={DocumentIcon} link={getRoute().articles()} /> */}
            {isCurrentUserRole.admin && <SidebarButton title="Справочник" icon={HandbooksIcon} link="handbooks" />}

            <Folders />
          </div>
          <div className="mt-3 mb-5 border-t border-default/20"></div>

          <Tags />
        </div>
      </div>
      <div className="sidebar-shadow" onClick={closeSidebar}></div>
    </>
  )
}
