import { SettingsIcon, FoldersIcon, FileTextIcon } from '@/assets/icons/stroke'
import { Button, Menu, MenuItem } from '@/features/ui'
import { useToggle } from '@/hooks/useToggle'
import { getRoute } from '@/utils'
import { FolderEditDialog } from '@/views/folders'
import { Link } from 'react-router-dom'
import { useProjectsContext } from '../Projects.Context'

export function Head() {
  const { folderId, folder, loading } = useProjectsContext()
  const [isCreateFolderOpen, , openCreateFolderOpen, closeCreateFolderOpen] = useToggle(false)
  const [isUpdateFolderOpen, , openUpdateFolderOpen, closeUpdateFolderOpen] = useToggle(false)

  const articleCreateRoute = folderId ? getRoute().projects(folderId + '/article/create') : getRoute().articles.create()

  return (
    <div className="flex items-center mb-8">
      {loading ? (
        <div className="w-64 h-6 mt-2  bg-opacity-50 animate-pulse bg-gray" />
      ) : (
        <div className="text-2xl font-semibold">{folder?.name ? folder.name : 'Статьи'}</div>
      )}
      <div className="flex ml-auto">
        {folder ? (
          <Button variant="contur" color="gray" onClick={openUpdateFolderOpen}>
            <SettingsIcon className="text-2xl" />
          </Button>
        ) : null}
        <Menu align="end" menuButton={<Button className="ml-4 px-7"> Добавить </Button>}>
          <MenuItem>
            <Button
              className="justify-start w-full"
              size="sm"
              color="gray"
              variant="text"
              onClick={openCreateFolderOpen}
            >
              <FoldersIcon className="mr-2" /> Папка
            </Button>
          </MenuItem>
          <Link to={articleCreateRoute}>
            <Button className="justify-start w-full" size="sm" color="gray" variant="text">
              <FileTextIcon className="mr-2" /> Статья
            </Button>
          </Link>
        </Menu>
      </div>

      {folder ? <FolderEditDialog isOpen={isUpdateFolderOpen} close={closeUpdateFolderOpen} item={folder} /> : null}
      <FolderEditDialog isOpen={isCreateFolderOpen} close={closeCreateFolderOpen} />
    </div>
  )
}
