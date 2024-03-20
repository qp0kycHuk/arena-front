import { filterFiles } from '@/utils'
import { docExtention, imageExtention } from '@/utils/const/extentions'
import { useArticleEditor } from './Editor.Context'
import { FileDrop } from 'react-file-drop'
import { PlusIcon } from '@/assets/icons/stroke'

export function EditorFileDrop() {
  const { insertDocuments, insertImages } = useArticleEditor()

  function dropHandler(fileList: FileList | null) {
    if (!fileList) return

    const files = Array.from(fileList)

    const images = filterFiles(files, [imageExtention.regex])
    const documents = filterFiles(files, [docExtention.regex])

    insertDocuments(documents)
    insertImages(images)
  }

  return (
    <FileDrop
      className="absolute -inset-4"
      targetClassName="filedrop-target"
      draggingOverFrameClassName="over-frame"
      draggingOverTargetClassName="over-target"
      onDrop={dropHandler}
    >
      <PlusIcon className="m-auto text-4xl text-primary" />
    </FileDrop>
  )
}
