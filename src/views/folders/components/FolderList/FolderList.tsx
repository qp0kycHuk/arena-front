import React from 'react'
import { Link } from 'react-router-dom'
import { getRoute } from '@utils/index'
import { IFolder } from '@models/Folder'
import { FolderItem, FolderItemPlacehlder } from '../FolderItem/FolderItem'

interface IFolderListProps {
  loading?: boolean
  items?: IFolder[]
}

export function FolderList({ loading, items }: IFolderListProps) {
  const isItemsReady = items && items?.length > 0 && !loading

  return (
    <>
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
              <FolderItem folder={folder} />
            </Link>
            <div className="border-t border-default/10" />
          </React.Fragment>
        ))}
    </>
  )
}
