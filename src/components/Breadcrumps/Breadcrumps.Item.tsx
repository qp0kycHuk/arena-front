import { IFolder } from '@/models/Folder'
import { useFetchFolderById } from '@/store/folders'
import { getRoute } from '@/utils'
import { Link } from './Breadcrumps.Link'

interface IItemProps {
  item?: IFolder | null
}

export function Item({ item }: IItemProps) {
  const { data } = useFetchFolderById(item?.parent_id || '')
  console.log(data?.item?.name)

  if (!data?.item) {
    return (
      <>
        <Link item={data?.item} />
      </>
    )
  }

  return (
    <>
      <Item item={data?.item} />
      {' / '}
      <Link item={data?.item} />
    </>
  )
}
