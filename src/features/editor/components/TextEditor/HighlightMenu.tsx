import * as React from 'react';
import { MenuButton } from './MenuButton';
import { BackgroundColorIcon } from '@assets/icons/stroke';
import { Editor } from '@tiptap/react';
import { rgb2hex } from '@utils/helpers/colors';

export interface IHighlightMenuProps {
    editor: Editor
}

export function HighlightMenu({ editor }: IHighlightMenuProps) {
    const currentColor = editor.getAttributes('textStyle').highlight

    return (
        <MenuButton title='Цвет выделения' className='relative'>
            <BackgroundColorIcon className="text-2xl" /> {currentColor}
            <label className='absolute inset-0 block cursor-pointer'>
                <input
                    className='absolute inset-0 opacity-0 pointer-events-none'
                    type="color"
                    onInput={(event: React.ChangeEvent<HTMLInputElement>) => editor.chain().focus().setHighlight({ color: event.target.value }).run()}
                    value={rgb2hex(currentColor)}
                />
            </label>
        </MenuButton>
    );
}
