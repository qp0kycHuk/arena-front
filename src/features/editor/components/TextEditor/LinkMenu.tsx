import React from 'react'
import { useCallback } from 'react'
import { MenuButton } from './MenuButton'
import { InsertLinkIcon } from '@assets/icons/stroke'
import type { Editor } from '@tiptap/react'
import { ILink } from '@models/Link'
import { getEditorSelection } from '@features/editor/hooks/useEditor'

interface ILinkMenuProps {
  editor: Editor
  onLink(link: Partial<ILink>): void
}

export function LinkMenu({ editor, onLink }: ILinkMenuProps) {
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()

      return
    }

    onLink({
      url,
      name: getEditorSelection(editor),
    })

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])
  return (
    <MenuButton title="Ссылка" isActive={editor.isActive('link')} onClick={setLink}>
      <InsertLinkIcon className="text-2xl" />
    </MenuButton>
  )
}
