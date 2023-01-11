import React from 'react'
import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'


interface IOptions {
    component: React.FC
}

export const FileBlockExtension = Node.create<IOptions>({
    name: 'fileBlock',
    group: 'block',
    atom: true,
    draggable: true,

    addAttributes() {
        return {
            name: {
                default: '',
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'file-block',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['file-block', mergeAttributes(HTMLAttributes)]
    },

    addNodeView() {
        return ReactNodeViewRenderer(this.options.component)
    },
})