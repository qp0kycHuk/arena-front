import React from 'react'
import type { Editor } from '@tiptap/react'
import { MenuButton } from './MenuButton'
import { SmileIcon } from '@assets/icons/stroke'
import { Menu, MenuTarget } from '@features/ui'

const emojiList = ['🤣', '😎', '😜', '🤡', '🍆', '🐱‍👤', '❤', '🎁', '👌', '👍', '🤝', '🤙']

export interface IEmojiMenuProps {
  editor: Editor
}

export function EmojiMenu({ editor }: IEmojiMenuProps) {
  return (
    <Menu
      align="center"
      unmountOnClose={true}
      menuButton={
        <MenuTarget>
          <MenuButton title="Эмоджи" disabled={!editor.can().chain().focus().setTextAlign('left').run()}>
            <SmileIcon className="text-2xl" />
          </MenuButton>
        </MenuTarget>
      }
    >
      <div className="grid grid-cols-4 gap-1 px-2">
        {emojiList.map((item) => (
          <MenuButton className="px-2" key={item} onClick={() => editor.chain().focus().insertContent(item).run()}>
            <span className="text-lg">{item}</span>
          </MenuButton>
        ))}
      </div>
    </Menu>
  )
}
