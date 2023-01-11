import * as React from 'react';
import { EditorContent, Editor as EditorClass } from '@tiptap/react'

import { MenuBar } from './MenuBar';
import { Button } from '@features/ui';

interface IEditorProps {
    editor: EditorClass | null
}

export function Editor({ editor }: IEditorProps) {

    if (!editor) {
        return <p>Editor loading...</p>
    }

    return (
        <>
            <MenuBar editor={editor} />
            <EditorContent className='w-full' editor={editor} />
            <div className="flex mt-10">
                <Button onClick={() => console.log(editor.getJSON())}>Get JSON</Button>
            </div>
        </>
    );
}
