import * as React from 'react';
import { EditorContent } from '@tiptap/react'
import type { Editor as EditorClass } from '@tiptap/react'

interface IEditorProps {
    editor: EditorClass | null,
    className?: string
}

export function Editor({ editor, className }: IEditorProps) {

    if (!editor) {
        return <p>Editor loading...</p>
    }

    return (
        <EditorContent className={`w-full ${className}`} editor={editor} />
    );
}
