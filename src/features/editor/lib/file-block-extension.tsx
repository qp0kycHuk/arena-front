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
      id: {
        default: '',
      },
      src: {
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
    // TODO
    return [
      'a',
      mergeAttributes({
        href: HTMLAttributes.src,
        target: '_blank',
        class: 'article-body-doc',
        title: HTMLAttributes.name,
      }),
      HTMLAttributes.name,
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(this.options.component)
  },
})
