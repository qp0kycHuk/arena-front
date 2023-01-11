import * as React from 'react';
import { Editor } from '@tiptap/react';
import { MenuButton } from './MenuButton';
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from '@assets/icons/stroke';
import { Menu, MenuTarget } from '@lib/Menu';

export interface IAlignMenuProps {
    editor: Editor
}

export function AlignMenu({ editor }: IAlignMenuProps) {

    let activeIcon = <AlignLeftIcon className="text-2xl" />

    if (editor.isActive({ textAlign: 'center' })) {
        activeIcon = <AlignCenterIcon className="text-2xl" />
    }
    if (editor.isActive({ textAlign: 'right' })) {
        activeIcon = <AlignRightIcon className="text-2xl" />
    }

    return (
        <Menu align='center' unmountOnClose={true} transition menuButton={
            <MenuTarget>
                <MenuButton title='Выравнивание' tagName="div"
                    disabled={!editor.can().chain().focus().setTextAlign('left').run()}>
                    {activeIcon}
                </MenuButton>
            </MenuTarget>
        }>
            <div className="flex px-2 gap-1">
                <MenuButton
                    title='По левому краю'
                    isActive={editor.isActive({ textAlign: 'left' })}
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    disabled={!editor.can().chain().focus().setTextAlign('left').run()}>
                    <AlignLeftIcon className="text-2xl" />
                </MenuButton>
                <MenuButton
                    title='По центру'
                    isActive={editor.isActive({ textAlign: 'center' })}
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    disabled={!editor.can().chain().focus().setTextAlign('center').run()}>
                    <AlignCenterIcon className="text-2xl" />
                </MenuButton>
                <MenuButton
                    title='По правому краю'
                    isActive={editor.isActive({ textAlign: 'right' })}
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    disabled={!editor.can().chain().focus().setTextAlign('right').run()}>
                    <AlignRightIcon className="text-2xl" />
                </MenuButton>
            </div>
        </Menu>
    );
}
