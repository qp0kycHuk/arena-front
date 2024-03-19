import { imageExtention } from '@utils/const/extentions'
import { filterFiles, getRandomUUID } from '@utils/index'
import { useCallback, useEffect } from 'react'

interface IUploaderParams {
  initialFiles?: IFileItem[]
  extention?: IExtention
  multiple?: boolean
  rounded?: boolean
  sign?: boolean
  onChange?: (fileItems: IFileItem[]) => void
  onRemove?: (fileItem: IFileItem) => void
  // onChange?: (fileItems: IFileItem[]) => any
}

export function useUploader({
  initialFiles = [],
  extention = imageExtention,
  multiple = true,
  rounded = false,
  sign = true,
  onChange,
  onRemove,
}: IUploaderParams): IUplodaer {
  const fileItems = initialFiles

  useEffect(() => {
    // setFileItems(initialFiles || [])
  }, [initialFiles])

  const addItems = useCallback(
    (items: File[]) => {
      const newItems = filterFiles(items, extention ? [extention.regex] : []).map((file) => ({
        key: getRandomUUID(),
        file,
        title: file.name,
      }))

      onChange?.([...(multiple ? newItems : newItems[0] ? [newItems[0]] : [])])
    },
    [extention, multiple, onChange]
  )

  const updateItem = useCallback((item: IFileItem, data: Partial<IFileItem>) => {
    const changedItem = {
      ...item,
      ...data,
    }

    onChange?.(fileItems.map((el) => (el === item ? changedItem : el)))
  }, [])

  const removeItem = useCallback(
    (item: IFileItem) => {
      onRemove?.(item)
    },
    [onRemove]
  )

  return {
    extention: extention || imageExtention,
    multiple,
    rounded,
    sign,
    fileItems,
    addItems,
    updateItem,
    removeItem,
  }
}
