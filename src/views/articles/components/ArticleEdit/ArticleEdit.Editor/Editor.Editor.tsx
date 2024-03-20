import { filterFiles } from '@/utils'
import { docExtention, imageExtention } from '@/utils/const/extentions'
import { Editor as EditorCore } from '@features/editor'
import { useArticleEditor } from './Editor.Context'

export function Editor() {
  const { editor, insertDocuments, insertImages, insertLink } = useArticleEditor()

  function filePasteHandler(event: React.ClipboardEvent) {
    const files = Array.from(event.clipboardData.files)

    const images = filterFiles(files, [imageExtention.regex])
    const documents = filterFiles(files, [docExtention.regex])

    insertDocuments(documents)
    insertImages(images)
  }

  return (
    <EditorCore
      onLink={insertLink}
      onPaste={filePasteHandler}
      editor={editor}
      className="min-h-[260px] flex flex-col"
    />
  )
}
