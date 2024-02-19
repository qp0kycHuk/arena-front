import React, { useMemo } from 'react'
import { Uploader } from '@features/fileUploader'
import { editorContentFilter } from '@features/editor/hooks/useEditor'
import { useArticleEditMainContext, useArticleEditUtilsContext } from './ArticleEdit.Context'
import { getFileItems } from '@utils/helpers/files'

// control upload and remove images
export function ArticleEditImages() {
  const { article, update } = useArticleEditMainContext()
  const { loadingStart, loadingEnd } = useArticleEditUtilsContext()

  const fileItems = useMemo(() => {
    return article?.files?.map((item) => ({
      id: item.id,
      src: item.src,
      name: item.name,
    }))
  }, [article])

  async function changeHandler(fileItems: IFileItem[]) {
    const files = fileItems.map((item) => (item as Required<IFileItem>).file)

    loadingStart()
    const updatedFiles = await getFileItems(files)
    loadingEnd()

    update({
      files: [...(article?.files || []), ...updatedFiles],
    })
  }

  function removeHandler(fileItem: IFileItem) {
    let isImageInContent = false

    const filteredContent = editorContentFilter(JSON.parse(article?.contentJson || '{}'), (item) => {
      if (item.type === 'image') {
        if (fileItem.id == item.attrs.id) {
          isImageInContent = true
        }

        return fileItem.id !== item.attrs.id
      }

      return true
    })

    const updatedContent = isImageInContent
      ? {
          content: filteredContent,
          contentJson: JSON.stringify(filteredContent),
        }
      : {}

    update({
      files: article?.files?.filter((item) => item.id !== fileItem.id),
      ...updatedContent,
    })
  }

  return (
    <Uploader fileItems={fileItems} onChange={changeHandler} onRemove={removeHandler}>
      <div className="font-semibold">Дополнительные изображения</div>
    </Uploader>
  )
}
