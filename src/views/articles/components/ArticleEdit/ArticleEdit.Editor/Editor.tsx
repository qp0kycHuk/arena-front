import { EdditorContextProvider } from './Editor.Context'
import { Control } from './Editor.Control'
import { EditorFileDrop } from './Editor.FileDrop'
import { Editor } from './Editor.Editor'

export function ArticleEditor() {
  return (
    <EdditorContextProvider>
      <div className="relative">
        <Control />
        <div className="relative">
          <EditorFileDrop />
          <Editor />
        </div>
      </div>
    </EdditorContextProvider>
  )
}
