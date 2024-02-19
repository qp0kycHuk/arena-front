import {
  BriefcaseIcon,
  CrownIcon,
  DocumentIcon,
  FoldersIcon,
  HandbooksIcon,
  ToTopIcon,
  UsersIcon,
} from '@assets/icons/stroke'
import { Button } from '@features/ui'
import { getRoute } from '@utils/index'
import { SidebarButton } from './SidebarButton'
import { Tags } from './Sidebar.Tags'
import { Folders } from './Sidebar.Folders'

export function Sidebar() {
  return (
    <div className="flex flex-col min-w-[266px] w-[266px] px-4 pt-6 pb-4 bg-l3 rounded-2xl  sticky top-16">
      <div className="space-y-1">
        <SidebarButton title="Главная" icon={CrownIcon} link="/" />
        <SidebarButton title="Пользователи" icon={UsersIcon} link={getRoute().users()} />
        {/* <SidebarButton title="Статьи" icon={DocumentIcon} link={getRoute().articles()} /> */}
        <SidebarButton title="Справочник" icon={HandbooksIcon} link="handbooks" />

        <Folders />
      </div>
      <div className="mt-3 mb-5 border-t border-default/20"></div>

      <Tags />
      <Button variant="text" size="sm" className="justify-start w-auto mt-5 -ml-2 -mr-2">
        Показать всё
      </Button>
    </div>
  )
}
