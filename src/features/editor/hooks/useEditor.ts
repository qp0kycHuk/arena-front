import { useEditor as useEditorConfig, EditorOptions } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import Heading from '@tiptap/extension-heading'
import Text from '@tiptap/extension-text'
import HardBreak from '@tiptap/extension-hard-break'
// code highlight
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { lowlight } from 'lowlight'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import php from 'highlight.js/lib/languages/php'


import { FileBlock } from '../components/TextEditor/FileBlock'
import { FilePaste, filePasteHandler } from '../lib/file-paste-extension'
import { FileBlockExtension } from '../lib/file-block-extension'

lowlight.registerLanguage('html', html)
lowlight.registerLanguage('css', css)
lowlight.registerLanguage('js', js)
lowlight.registerLanguage('ts', ts)
lowlight.registerLanguage('php', php)


interface IOptions {
    config?: Partial<EditorOptions> | undefined
    placeholder?: string
}

const defaultOptions = {
    config: {},
    placeholder: 'Type here'
}

export function useEditor(options?: IOptions) {
    const { config, placeholder } = options || defaultOptions

    return useEditorConfig({
        extensions: [
            StarterKit.configure({
                codeBlock: false,
            }),
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
            Placeholder.configure({ placeholder: placeholder, }),
        ],
        ...config

    })
}


export function useTitleEditor(options?: IOptions) {
    const { config, placeholder } = options || defaultOptions

    const CustomDocument = Document.extend({
        content: 'heading',
    })

    return useEditorConfig({
        extensions: [
            CustomDocument,
            HardBreak,
            Text,
            Heading.configure({ levels: [2], }),
            Placeholder.configure({
                placeholder: placeholder,
            }),
        ],
        ...config
    })
}