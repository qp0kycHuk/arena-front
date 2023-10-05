import { BriefcaseIcon, FoldersIcon, ToTopIcon } from '@/assets/icons/stroke'
import { SidebarButton } from './SidebarButton'
import { useFetchFolders } from '@/store/folders'
import { getRoute } from '@/utils'
import { useToggle } from '@/hooks/useToggle'
import classNames from 'classnames'

export function Folders() {
  const { data: foldersData } = useFetchFolders()
  const sortedFolders = foldersData?.items || []
  const [expanded, toggleExpanded] = useToggle()

  return (
    <>
      <SidebarButton onClick={toggleExpanded} title="База знаний" icon={BriefcaseIcon}>
        <ToTopIcon
          className={classNames(
            expanded ? '' : 'rotate-90',
            'ml-auto text-base text-gray dark:text-white transition-transform'
          )}
        />
      </SidebarButton>
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
