import React from 'react'
import { ReactComponent as FolderIcon } from '@assets/img/folder.svg'
import { IFolder } from '@models/Folder'
import { Skeleton } from '@/components/Skeleton'
import { markFromQuery } from '@/utils/helpers/markFromQuery'
import { useSearchQuery } from '@/hooks/useSearchQuery'
import { useProjectsContext } from '@/views/projects/components/Projects.Context'

interface IFolderItemProps {
  folder: IFolder
}

export function FolderItem({ folder }: IFolderItemProps) {
  const { searchQuery } = useProjectsContext()

  return (
    <div className="flex items-center px-4 py-4 -mx-4 hover:bg-primary hover:bg-opacity-10 rounded-2xl">
      <FolderIcon className="mr-4 text-3xl" />
      {/* <div className="py-2 mr-4 text-xs font-semibold text-center rounded-full bg-default/5 text-default/70 w-11">
        {(folder.articles?.length || 0) + (folder.children?.length || 0)}
      </div> */}
      <div
        className="font-semibold with-mark-query"
        dangerouslySetInnerHTML={{ __html: markFromQuery(folder.name, searchQuery) }}
      ></div>
    </div>
  )
}

export function FolderItemPlacehlder() {
  return (
    <div className="flex items-center py-4">
      <FolderIcon className="mr-4 text-3xl" />
      {/* <Skeleton className="h-8 py-2 mr-4 text-xs font-semibold text-center rounded-full w-11" /> */}
      <Skeleton className="w-64 h-5 mb-3" />
      <div className="ml-auto">
        <Skeleton className="w-24 h-3 mb-1 ml-1" />
        <Skeleton className="w-24 h-3 ml-1" />
      </div>
    </div>
  )
}
