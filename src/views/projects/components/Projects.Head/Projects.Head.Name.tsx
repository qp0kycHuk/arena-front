import { useProjectsContext } from '../Projects.Context'

export function Name() {
  const { folder, fetching } = useProjectsContext()

  return fetching ? (
    <div className="w-64 h-6 mt-2  bg-opacity-50 animate-pulse bg-gray" />
  ) : (
    <div className="text-2xl font-semibold">{folder?.name ? folder.name : 'База знаний'}</div>
  )
}
