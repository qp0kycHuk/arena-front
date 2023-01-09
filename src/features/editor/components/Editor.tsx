import * as React from 'react';
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'
// code highlight
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { lowlight } from 'lowlight'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import php from 'highlight.js/lib/languages/php'

import { MenuBar } from './MenuBar';
import { ImagePaste, pasteImageHandler } from '@lib/image-paste';

lowlight.registerLanguage('html', html)
lowlight.registerLanguage('css', css)
lowlight.registerLanguage('js', js)
lowlight.registerLanguage('ts', ts)
lowlight.registerLanguage('php', php)

export interface IEditorProps {
}



export function Editor(props: IEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextStyle,
            Color,
            CodeBlockLowlight.configure({ lowlight, }),
            TextAlign.configure({ types: ['heading', 'paragraph'], }),
            Highlight.configure({ multicolor: true }),
            Link.configure({ openOnClick: false, }),
            Image.configure({ allowBase64: true, }),
            ImagePaste.configure({
                fileMatchRegex: /^image\/(gif|jpe?g|a?png|svg|webp|bmp)/i,
                disableImagePaste: false,
                render: () => {
                    return {
                        onImagePaste: pasteImageHandler,
                        onImageDrop: pasteImageHandler,
                    };
                },
            }),
        ],
        content: `— У тебя все еще нет сумки? Сейчас она актуальна как никогда.
        — Избавит тебя от вечно мешающих ключей и монеток в карманах на прогулке
        — Десятки авторских расцветок, регулируемый ремешок и неубиваемый принт!`,

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
