import { useDrag, useDrop } from 'react-dnd'
import { FolderItem } from './FolderItem'
import { IFolder } from '@/models/Folder'
import { twMerge } from 'tailwind-merge'

interface IFolderItemDragDropProps {
  folder: IFolder
  draggable?: boolean
}

export function FolderItemDragDrop({ folder, draggable = true }: IFolderItemDragDropProps) {
  const [collected, drag] = useDrag(() => ({
    type: 'folder',
    item: folder,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  const [{ isOver, canDrop, item }, drop] = useDrop({
    accept: ['article', 'folder'],
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      item: monitor.getItem(),
    }),
  })

  const isCanOver = isOver && canDrop && item.id != folder.id

  function onDrop(item: any) {
    console.log(item)
  }

  return (
    <div ref={draggable ? drag : null}>
      <div
        ref={drop}
        className={twMerge('px-4 -mx-4 border border-primary/0', isCanOver ? 'bg-primary/10  border-primary' : null)}
      >
        <FolderItem folder={folder} />
      </div>
    </div>
  )
}
