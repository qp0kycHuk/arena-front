import { PropsWithChildren } from 'react'
import { UploaderFileDrop } from './UploaderFileDrop'
import { UploaderItems } from './UploaderItems'
import { UploaderLabel } from './UploaderLabel'
import { useUploader } from '../hooks/useUploader'

interface IUploaderProps extends PropsWithChildren {
  fileItems?: IFileItem[]
  extention?: IExtention
  multiple?: boolean
  rounded?: boolean
  sign?: boolean
  onChange?: (fileItems: IFileItem[]) => unknown
  onRemove?: (fileItem: IFileItem) => unknown
}

export function Uploader({
  fileItems,
  extention,
  multiple,
  rounded,
  sign,
  onChange,
  onRemove,
  children,
}: IUploaderProps) {
  const uploader = useUploader({
    multiple,
    rounded,
    sign,
    initialFiles: fileItems,
    onChange,
    onRemove,
  })

  const isNonMultipleAccept = !(!uploader.multiple && uploader.fileItems.length > 0)

  return (
    <div className="relative flex flex-wrap gap-3">
      {children ? <div className="w-full">{children}</div> : null}
      <UploaderFileDrop uploader={uploader} />
      <UploaderItems uploader={uploader} />
      {isNonMultipleAccept ? <UploaderLabel uploader={uploader} /> : null}
    </div>
  )
}
