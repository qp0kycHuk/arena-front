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

  function clickHandler(id: EntityId) {
    let newTags = Array.from(new Set([...tagsQuery, id.toString()]))

    if (tagsQuery.includes(id.toString())) {
      newTags = newTags.filter((tagId) => tagId != id)
    }

    changeTagsQuery(newTags)
  }

  if (tagsQuery.length === 0) {
    return null
  }

  return (
    <div className="flex items-center gap-2 mb-4 flex-wrap">
      <div className="max-sm:w-full">Выбранные тэги</div>
      <Button color="primary" variant="light" size="xs" className="px-3 max-w-full rounded-full" onClick={clear}>
        <span className="flex items-center text-xs font-normal truncate">Очистить всё</span>
        <CrossIcon className="ml-2" />
      </Button>
      {tagsQuery.map((id) => (
        <Tag active key={id} onClick={() => clickHandler(id)}>
          #{tagData?.entities[id]?.name}
          <CrossIcon className="ml-2" />
        </Tag>
      ))}
    </div>
  )
}
