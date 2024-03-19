import React from 'react'
import { IFolder } from '@/models/Folder'
import { Item } from './Breadcrumps.Item'
import { Link } from './Breadcrumps.Link'

interface IBreadcrumpsProps extends React.PropsWithChildren {
  item?: IFolder
}

export function Breadcrumps({ item, children }: IBreadcrumpsProps) {
  return (
    <div className="flex text-xs text-default/50 gap-1 mb-2">
      <Item item={item} />
      {item && (
        <>
          / <Link item={item} />
        </>
      )}
      /{children}
    </div>
  )
}
