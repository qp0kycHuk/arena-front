import { SettingsIcon } from '@/assets/icons/stroke'
import { Button } from '@/features/ui'
import { useToggle } from '@/hooks/useToggle'
import { FolderEditDialog } from '@/views/folders'
import { useProjectsContext } from '../Projects.Context'

export function FolderSettings() {
  const { folderId, folder, fetching } = useProjectsContext()
  const [isUpdateFolderOpen, , openUpdateFolderOpen, closeUpdateFolderOpen] = useToggle(false)

  if (!folderId) return null

  return (
    <>
      <Button variant="contur" color="default" onClick={openUpdateFolderOpen} disabled={fetching}>
        <SettingsIcon className="text-2xl opacity-60" />
      </Button>

      {folder ? <FolderEditDialog isOpen={isUpdateFolderOpen} onClose={closeUpdateFolderOpen} item={folder} /> : null}
    </>
  )
}
