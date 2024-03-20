import React from 'react'
import type { Editor } from '@tiptap/react'
import { MenuButton } from './MenuButton'
import { DocumentIcon } from '@assets/icons/stroke'

interface IDocumentMenuProps {
  editor: Editor
  onDocAdd?(file: File[]): void
}

export function DocumentMenu({ editor, onDocAdd }: IDocumentMenuProps) {
  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      onDocAdd?.(Array.from(event.target.files))
    }
  }

  return (
    <MenuButton title="Файл" className="relative">
      <label className="absolute inset-0 block cursor-pointer">
        <input
          onChange={changeHandler}
          type="file"
          multiple
          accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf"
          className="absolute inset-0 opacity-0 pointer-events-none"
        />
      </label>
      <DocumentIcon className="text-2xl" />
    </MenuButton>
  )
}
