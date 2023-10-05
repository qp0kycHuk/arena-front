import { Tag, TagPlaceholder } from '@/components/Tag'
import { useFetchTags } from '@/store/tags'

export function Tags() {
  const { data: tagsData, isFetching } = useFetchTags()
  const sortedTags = tagsData?.items.sort((a, b) => b.articles.length - a.articles.length) || []

  return (
    <div className="flex flex-wrap gap-2">
      {isFetching
        ? new Array(5).fill(true).map((_, index) => <TagPlaceholder key={index} />)
        : sortedTags.map((tag) => <Tag key={tag.id}>#{tag.name}</Tag>)}
    </div>
  )
}
