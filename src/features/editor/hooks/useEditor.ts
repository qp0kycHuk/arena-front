import { useMemo } from 'react'
import { useEditor as useEditorConfig, EditorOptions, generateHTML, JSONContent } from '@tiptap/react'
import { Node } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
// code highlight

import { lowlight } from 'lowlight'
import { toHtml } from 'hast-util-to-html'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import php from 'highlight.js/lib/languages/php'

import { FileBlock } from '../components/TextEditor/FileBlock'
import { FileBlockExtension } from '../lib/file-block-extension'
import { IFile } from '@models/File'

lowlight.registerLanguage('html', html)
lowlight.registerLanguage('css', css)
lowlight.registerLanguage('js', js)
lowlight.registerLanguage('ts', ts)
lowlight.registerLanguage('php', php)


export interface IOptions {
    config?: Partial<EditorOptions> | undefined
    placeholder?: string
    uploadFunction?(files: File[]): Promise<IFile[] | undefined>
}

const defaultOptions = {
    config: {},
    placeholder: 'Type here',
    uploadFunction: undefined
}

const LowlightCustom = Node.create({
    name: 'lowlightcustom',
    group: 'block',
    atom: true,
    addAttributes() {
        return {
            content: {
                default: '',
            },
        }
    },
    renderHTML({ HTMLAttributes }) {
        const lowlighted = lowlight.highlightAuto(HTMLAttributes.content);
        const html = toHtml(lowlighted)

        const pre = document.createElement('pre')
        const code = document.createElement('code')
        code.innerHTML = html
        pre.appendChild(code)

        return {
            dom: pre,
        }
    },
})

const CustomImage = Image.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            id: {
                default: 'null',

            },
        }
    }
})

export const editorExtensions = [
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
    CustomImage.configure({ allowBase64: true }),
    LowlightCustom,
    FileBlockExtension.configure({
        component: FileBlock
    }),
]

export function useEditor(options?: IOptions, deps?: any[]) {
    const { config, placeholder } = options || defaultOptions

    return useEditorConfig({
        extensions: [
            ...editorExtensions,
            Placeholder.configure({ placeholder: placeholder, }),
        ],

        ...config
    }, [config, ...(deps || [])])
}

export function useInitialContent(content?: string, dependeties: any[] = []) {
    const initialContent = useMemo(() => {
        try {
            return content ? JSON.parse(content) : ''
        } catch (error) {
            return content ? content : ''
        }
    }, dependeties || []);

    return initialContent
}

export function useGenerateHtml(content: string = ''): string {
    const html = useMemo(() => {
        try {
            const json: JSONContent = content ? JSON.parse(content) : null
            if (json?.content) {
                json.content = json.content.map((item: any) => {
                    if (item.type === 'codeBlock') {
                        const content = item.content.map(({ text }: any) => text).join('\n');

                        return {
                            type: 'lowlightcustom',
                            attrs: { content }
                        }
                    }

                    return item
                })
            }

            return json ? generateHTML(json, editorExtensions) : ''
        } catch (error) {
            return content ? content : ''
        }
    }, [content]);

    return html
}

export function editorContentUpdate(editorJson: any, updateFn: (item: any) => any) {
    if (editorJson.content?.length > 0) {
        editorJson.content = editorJson.content.map(updateFn)
        editorJson.content.forEach((item: any) => editorContentUpdate(item, updateFn))
    }
    return editorJson
}

export function editorContentFilter(editorJson: any, filterFn: (item: any) => any) {
    if (editorJson.content?.length > 0) {
        editorJson.content = editorJson.content.filter(filterFn)
        editorJson.content.forEach((item: any) => editorContentFilter(item, filterFn))
    }
    return editorJson
}