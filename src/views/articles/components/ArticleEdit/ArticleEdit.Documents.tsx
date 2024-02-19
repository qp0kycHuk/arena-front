import React, { useMemo } from 'react'
import { Uploader } from '@features/fileUploader'
import { editorContentFilter } from '@features/editor/hooks/useEditor'
import { useArticleEditMainContext, useArticleEditUtilsContext } from './ArticleEdit.Context'
import { getFileItems } from '@utils/helpers/files'
import { docExtention } from '@/utils/const/extentions'

// control upload and remove images
export function ArticleEditDocuments() {
  const { article, update } = useArticleEditMainContext()
  const { loadingStart, loadingEnd } = useArticleEditUtilsContext()

  const fileItems = useMemo(() => {
    return article?.docs?.map((item) => ({
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
      docs: [...(article?.docs || []), ...updatedFiles],
    })
  }

  function removeHandler(fileItem: IFileItem) {
    const filteredContent = editorContentFilter(JSON.parse(article?.contentJson || '{}'), (item) => {
      if (item.type === 'fileBlock') {
        return fileItem.id !== item.attrs.id
      }

      return true
    })

    update({
      content: filteredContent,
      contentJson: JSON.stringify(filteredContent),
      docs: article?.docs?.filter((item) => item.id !== fileItem.id),
    })
  }

  return (
    <Uploader fileItems={fileItems} onChange={changeHandler} onRemove={removeHandler} extention={docExtention}>
      <div className="font-semibold">Документы</div>
    </Uploader>
  )
}
