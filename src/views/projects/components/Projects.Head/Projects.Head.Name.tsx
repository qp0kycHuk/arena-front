import { Skeleton } from '@/components/Skeleton'
import { useProjectsContext } from '../Projects.Context'

export function Name() {
  const { folder, folderLoading } = useProjectsContext()

  if (folderLoading) {
    return <Skeleton className="w-64 h-6 mt-2" />
  }

  return <div className="text-2xl font-semibold">{folder?.name ? folder.name : 'База знаний'}</div>
}
