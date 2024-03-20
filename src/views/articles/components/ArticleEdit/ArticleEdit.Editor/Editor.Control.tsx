import { EditorControl } from '@/features/editor'
import { useArticleEditor } from './Editor.Context'

export function Control() {
  const { editor, insertDocuments, insertImages, insertLink } = useArticleEditor()

  return (
    <EditorControl
      onLink={insertLink}
      onImageAdd={insertImages}
      onDocAdd={insertDocuments}
      editor={editor}
      className="sticky z-10 -ml-4 -mr-4 top-16"
    />
  )
}
