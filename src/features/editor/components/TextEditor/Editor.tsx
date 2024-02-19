import React from 'react'
import { EditorContent, PureEditorContent } from '@tiptap/react'
import type { Editor as EditorClass } from '@tiptap/react'
import { ILink } from '@models/Link'

interface IEditorProps extends Partial<React.MemoExoticComponent<typeof PureEditorContent>> {
  editor: EditorClass | null
  className?: string
  onPaste?(event: React.ClipboardEvent): void
  onLink?(link: Partial<ILink>): void
}

export function Editor({ editor, className, onPaste }: IEditorProps) {
  return <EditorContent editor={editor} className={className} onPaste={onPaste} />
}
