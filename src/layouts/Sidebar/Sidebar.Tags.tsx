import { Tag } from '@/components/Tag'
import { useFetchTags } from '@/store/tags'

export function Tags() {
  const { data: tagsData } = useFetchTags()
  const sortedTags = tagsData?.items.sort((a, b) => b.articles.length - a.articles.length) || []

  return (
    <div className="flex flex-wrap gap-2">
      {sortedTags.map((tag) => (
        <Tag key={tag.id}>#{tag.name}</Tag>
      ))}
    </div>
  )
}
