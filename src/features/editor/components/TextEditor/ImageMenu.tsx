import React from 'react'
import { MenuButton } from './MenuButton'
import { ImageIcon } from '@assets/icons/stroke'
import type { Editor } from '@tiptap/react'

export interface IImageMenuProps {
  editor: Editor
  onImageAdd?(files: File[]): any
}

export function ImageMenu({ onImageAdd }: IImageMenuProps) {
  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      onImageAdd?.(Array.from(event.target.files))
    }
  }

  return (
    <MenuButton title="Изображение" className="relative">
      <label className="absolute inset-0 block cursor-pointer">
        <input
          onChange={changeHandler}
          type="file"
          multiple
          accept="image/*"
          className="absolute inset-0 opacity-0 pointer-events-none"
        />
      </label>
      <ImageIcon className="text-2xl" />
    </MenuButton>
  )
}
