import { Tag, TagPlaceholder } from '@/components/Tag'
import { useTagsQuery } from '@/hooks/useTagsQuery'
import { useFetchTags } from '@/store/tags'
import { getRoute } from '@/utils'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'

export function Tags() {
  const [tagsQuery, changeTagsQuery] = useTagsQuery()
  const { data: tagsData, isFetching } = useFetchTags()
  const sortedTags = tagsData?.items.sort((a, b) => b.articles.length - a.articles.length) || []
  const navigate = useNavigate()
  const { pathname } = useLocation()

  function clickHandler(id: EntityId) {
    const path = getRoute().projects()
    let newTags = Array.from(new Set([...tagsQuery, id.toString()]))

    if (tagsQuery.includes(id.toString())) {
      newTags = newTags.filter((tagId) => tagId != id)
    }

    if (!pathname.includes(path)) {
      navigate(
        getRoute().projects() +
          '?' +
          createSearchParams({
            tags: newTags,
          }).toString()
      )
    } else {
      changeTagsQuery(newTags)
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {isFetching && new Array(5).fill(true).map((_, index) => <TagPlaceholder key={index} />)}
      {!isFetching &&
        sortedTags.map((tag) => {
          return (
            <Tag active={tagsQuery.includes(tag.id.toString())} onClick={() => clickHandler(tag.id)} key={tag.id}>
              #{tag.name}
            </Tag>
          )
        })}
    </div>
  )
}
