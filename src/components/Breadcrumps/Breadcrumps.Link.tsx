import { IFolder } from '@/models/Folder'
import { getRoute } from '@/utils'
import { Link as LinkComponent } from 'react-router-dom'

interface ILinkProps {
  item?: IFolder | null
}

export function Link({ item }: ILinkProps) {
  return (
    <LinkComponent to={getRoute().projects(item?.id)} className="hover:underline">
      {item?.name || 'База знаний'}
    </LinkComponent>
  )
}
