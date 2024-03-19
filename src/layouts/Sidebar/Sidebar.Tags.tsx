import { Tag, TagPlaceholder } from '@/components/Tag'
import { Button, Dialog } from '@/features/ui'
import { useTagsQuery } from '@/hooks/useTagsQuery'
import { useToggle } from '@/hooks/useToggle'
import { ITag } from '@/models/Tag'
import { useFetchTags } from '@/store/tags'
import { getRoute } from '@/utils'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'

export function Tags() {
  const [tagsQuery, changeTagsQuery] = useTagsQuery()
  const { data: tagsData, isFetching } = useFetchTags()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [isOpen, , openDialog, closeDialog] = useToggle()

  const sortedTags = tagsData?.items.sort((a, b) => b.articles.length - a.articles.length) || []

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

  const RenderTags = ({ tags }: { tags: ITag[] }) => (
    <div className="flex flex-wrap gap-2">
      {isFetching && new Array(5).fill(true).map((_, index) => <TagPlaceholder key={index} />)}
      {!isFetching &&
        tags.map((tag) => {
          return (
            <Tag active={tagsQuery.includes(tag.id.toString())} onClick={() => clickHandler(tag.id)} key={tag.id}>
              #{tag.name}
            </Tag>
          )
        })}
    </div>
  )

  return (
    <>
      <RenderTags tags={sortedTags.slice(0, 5)} />
      <Button variant="text" size="sm" className="justify-start w-auto mt-5 -mx-2" onClick={openDialog}>
        Показать всё
      </Button>

      <Dialog isOpen={isOpen} onClose={closeDialog} className="max-w-2xl w-full p-8">
        <div className="text-2xl font-semibold mb-8">Тэги</div>
        <RenderTags tags={sortedTags} />

        <Button className=" mt-5" onClick={closeDialog}>
          Готово
        </Button>
      </Dialog>
    </>
  )
}
