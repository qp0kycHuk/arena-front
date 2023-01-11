import { useEditor as useEditorConfig, EditorOptions } from '@tiptap/react'
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
import { FilePaste, filePasteHandler } from '@lib/Editor/file-paste-extension';
import { FileBlockExtension } from '@lib/Editor/file-block-extension';

import { FileBlock } from '../components/FileBlock'

lowlight.registerLanguage('html', html)
lowlight.registerLanguage('css', css)
lowlight.registerLanguage('js', js)
lowlight.registerLanguage('ts', ts)
lowlight.registerLanguage('php', php)

type IConfig = Partial<EditorOptions> | undefined

export function useEditor(config?: IConfig) {
    return useEditorConfig({
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
            FilePaste.configure({
                render: () => {
                    return {
                        onPaste: filePasteHandler,
                        onDrop: filePasteHandler,
                    };
                },
            }),
            FileBlockExtension.configure({
                component: FileBlock
            }),
        ],
        ...config

    })
}