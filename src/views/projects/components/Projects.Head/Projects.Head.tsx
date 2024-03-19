import { Name } from './Projects.Head.Name'
import { HeadMenu } from './Projects.Head.Menu'
import { FolderSettings } from './Projects.Head.FolderSettings'
import { ToLeftIcon } from '@/assets/icons/stroke'
import { Button } from '@/features/ui'
import { Link } from 'react-router-dom'
import { getRoute } from '@/utils'
import { useProjectsContext } from '../Projects.Context'

export function Head() {
  const { folder } = useProjectsContext()

  return (
    <div className="flex gap-3 sm:items-center mb-8 max-sm:flex-col">
      {folder && (
        <Button as={Link} to={getRoute().projects(folder?.parent_id || '')} icon variant="text" size="sm">
          <ToLeftIcon />
        </Button>
      )}
      <Name />
      <div className="flex sm:ml-auto">
        <FolderSettings />
        <HeadMenu />
      </div>
    </div>
  )
}
