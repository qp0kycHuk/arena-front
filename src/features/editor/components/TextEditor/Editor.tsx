import * as React from 'react';
import { EditorContent, PureEditorContent } from '@tiptap/react'
import type { Editor as EditorClass } from '@tiptap/react'

interface IEditorProps extends Partial<React.MemoExoticComponent<typeof PureEditorContent>> {
    editor: EditorClass | null,
    className?: string
}

export const  Editor = EditorContent