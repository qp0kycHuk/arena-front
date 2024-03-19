import { Link } from 'react-router-dom'
import { FoldersIcon, FileTextIcon } from '@/assets/icons/stroke'
import { Button, Menu, MenuItem } from '@/features/ui'
import { useToggle } from '@/hooks/useToggle'
import { getRoute } from '@/utils'
import { FolderEditDialog } from '@/views/folders'
import { useProjectsContext } from '../Projects.Context'

export function HeadMenu() {
  const { folderId, fetching } = useProjectsContext()
  const [isCreateFolderOpen, , openCreateFolderOpen, closeCreateFolderOpen] = useToggle(false)
  const articleCreateRoute = folderId ? getRoute().projects(folderId + '/article/create') : getRoute().articles.create()

  if (!folderId) {
    return (
      <>
        <Button className="ml-4 px-7" disabled={fetching} onClick={openCreateFolderOpen}>
          Добавить
        </Button>

        <FolderEditDialog isOpen={isCreateFolderOpen} onClose={closeCreateFolderOpen} />
      </>
    )
  }

  return (
    <>
      <Menu
        align="end"
        menuButton={
          <Button className="ml-4 px-7" disabled={fetching}>
            Добавить
          </Button>
        }
      >
        <MenuItem>
          <Button className="justify-start w-full" size="sm" color="gray" variant="text" onClick={openCreateFolderOpen}>
            <FoldersIcon className="mr-2" /> Папка
          </Button>
        </MenuItem>
        <Link to={articleCreateRoute}>
          <Button className="justify-start w-full" size="sm" color="gray" variant="text">
            <FileTextIcon className="mr-2" /> Статья
          </Button>
        </Link>
      </Menu>

      <FolderEditDialog isOpen={isCreateFolderOpen} onClose={closeCreateFolderOpen} />
    </>
  )
}
