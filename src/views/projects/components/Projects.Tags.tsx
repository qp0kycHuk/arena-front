import { useFetchTags } from '@/store/tags'
import { useProjectsContext } from './Projects.Context'
import { Tag } from '@/components/Tag'
import { Button } from '@/features/ui'
import { CrossIcon } from '@/assets/icons/fill'

export function Tags() {
  const { tagsQuery, changeTagsQuery } = useProjectsContext()
  const { data: tagData } = useFetchTags()

  function clear() {
    changeTagsQuery([])
  }

  if (tagsQuery.length === 0) {
    return null
  }

  return (
    <div className="flex items-center gap-2 mb-4">
      <div>Выбранные тэги</div>
      <Button color="primary" variant="light" size="xs" rounded className={'px-3 max-w-full'} onClick={clear}>
        <span className="flex items-center text-xs font-normal truncate">Очистить всё</span>
        <CrossIcon className="ml-2" />
      </Button>
      {tagsQuery.map((id) => (
        <Tag active key={id}>
          #{tagData?.entities[id].name}
        </Tag>
      ))}
    </div>
  )
}
