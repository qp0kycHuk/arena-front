import { BriefcaseIcon, FoldersIcon, ToTopIcon } from '@/assets/icons/stroke'
import { SidebarButton } from './SidebarButton'
import { useFetchFolders } from '@/store/folders'
import { getRoute } from '@/utils'
import { useToggle } from '@/hooks/useToggle'
import classNames from 'classnames'
import { Button } from '@/features/ui'
import { useLocation } from 'react-router-dom'

export function Folders() {
  const location = useLocation()
  const [expanded, toggleExpanded] = useToggle(true)
  const { data: foldersData } = useFetchFolders()
  const sortedFolders = foldersData?.items || []

  return (
    <>
      <div className="relative">
        <SidebarButton
          active={location.pathname.includes(getRoute().projects())}
          link={getRoute().projects()}
          title="База знаний"
          icon={BriefcaseIcon}
        ></SidebarButton>
        <div className="absolute right-1 top-1/2 -translate-y-1/2 z-[2]">
          <Button icon variant="text" className="" size="xs" onClick={toggleExpanded}>
            <ToTopIcon
              className={classNames(expanded ? '' : 'rotate-90', 'text-base text-default/80 transition-transform')}
            />
          </Button>
        </div>
      </div>
      {expanded &&
        sortedFolders.map((folder) => (
          <SidebarButton
            link={getRoute().projects(folder.id)}
            title={folder.name}
            icon={FoldersIcon}
            className="pl-8"
            key={folder.id}
          />
        ))}
    </>
  )
}
