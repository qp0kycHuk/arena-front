import * as React from 'react';
import { useEditor, EditorContent, RawCommands } from '@tiptap/react'
import { Extension } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'

// code highlight
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { lowlight } from 'lowlight'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import php from 'highlight.js/lib/languages/php'

import { MenuBar } from './MenuBar';

lowlight.registerLanguage('html', html)
lowlight.registerLanguage('css', css)
lowlight.registerLanguage('js', js)
lowlight.registerLanguage('ts', ts)
lowlight.registerLanguage('php', php)

export interface IEditorProps {
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        customExtension: {
            /**
             * Comments will be added to the autocomplete.
             */
            shiftTab: () => ReturnType,
            addTab: () => ReturnType,
        }
    }
}

const CustomExtension = Extension.create({
    addCommands() {
        return {
            shiftTab: () => ({ commands }) => {
                console.log(commands);

                return true
            },
            addTab: () => (a) => {
                console.log(a);

                return true
            },
        }
    },
    
})


export function Editor(props: IEditorProps) {
    const editor = useEditor({
        extensions: [
            CustomExtension,
            StarterKit,
            Underline,
            TextStyle,
            Color,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Highlight.configure({ multicolor: true }),
            Link.configure({
                openOnClick: false,
            }),
            CodeBlockLowlight.configure({
                lowlight,
            }),
        ],
        content: '',

    })

    if (!editor) {
        return <p>Editor loading...</p>
    }

    return (
        <>
            <MenuBar editor={editor} />
            <EditorContent className='w-full' editor={editor} />
        </>
    );
}
