import React from 'react'
import { Link } from 'react-router-dom'
import { getRoute } from '@utils/index'
import { IFolder } from '@models/Folder'
import { FolderItem, FolderItemPlacehlder } from '../FolderItem/FolderItem'
import { FolderItemDragDrop } from '../FolderItem/FolderItem.DragDrop'

interface IFolderListProps {
  loading?: boolean
  items?: IFolder[]
  parent?: IFolder
  draggable?: boolean
}

export function FolderList({ loading, items, parent, draggable }: IFolderListProps) {
  const isItemsReady = items && items?.length > 0 && !loading

  const parentFolder = {
    id: parent?.parent_id,
    name: '...',
  } as IFolder

  return (
    <>
      {parent && (
        <>
          <Link className="peer" to={getRoute().projects(parent.parent_id || '')}>
            {draggable ? (
              <FolderItemDragDrop draggable={false} folder={parentFolder} />
            ) : (
              <FolderItem folder={parentFolder} />
            )}
          </Link>
          <div className="border-t border-default/10" />
        </>
      )}
      {loading &&
        new Array(2).fill(1).map((_, index) => (
          <React.Fragment key={index}>
            <FolderItemPlacehlder />
            <div className="border-t border-default/10" />
          </React.Fragment>
        ))}
      {isItemsReady &&
        items.map((folder) => (
          <React.Fragment key={folder.id}>
            <Link className="peer" to={getRoute().projects(folder.id)}>
              {draggable ? <FolderItemDragDrop folder={folder} /> : <FolderItem folder={folder} />}
            </Link>
            <div className="border-t border-default/10" />
          </React.Fragment>
        ))}
    </>
  )
}
