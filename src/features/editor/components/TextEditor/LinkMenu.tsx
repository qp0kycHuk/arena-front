import React from 'react'
import { useCallback } from 'react'
import { MenuButton } from './MenuButton'
import { InsertLinkIcon } from '@assets/icons/stroke'
import type { Editor } from '@tiptap/react'

interface ILinkMenuProps {
  editor: Editor
}

export function LinkMenu({ editor }: ILinkMenuProps) {
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

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])
  return (
    <MenuButton title="Ссылка" isActive={editor.isActive('link')} onClick={setLink}>
      <InsertLinkIcon className="text-2xl" />
    </MenuButton>
  )
}
