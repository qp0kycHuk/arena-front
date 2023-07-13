import React from 'react'
import { EditorContent, PureEditorContent } from '@tiptap/react'
import type { Editor as EditorClass } from '@tiptap/react'

interface IEditorProps extends Partial<React.MemoExoticComponent<typeof PureEditorContent>> {
  editor: EditorClass | null
  className?: string
  onPaste(event: React.ClipboardEvent): any
}

export function Editor({ editor, className, onPaste }: IEditorProps) {
  return <EditorContent editor={editor} className={className} onPaste={onPaste} />
}
