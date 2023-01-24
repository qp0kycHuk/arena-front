import * as React from 'react';
import { MenuButton } from './MenuButton';
import { TextColorIcon } from '@assets/icons/stroke';
import { Editor } from '@tiptap/react';
import { rgb2hex } from '@utils/colors';

export interface IColorMenuProps {
    editor: Editor
}

export function ColorMenu({ editor }: IColorMenuProps) {
    const currentColor = editor.getAttributes('textStyle').color

    return (
        <MenuButton title='Цвет текста' className='relative'>
            <TextColorIcon className="text-2xl" />
            <label className='absolute inset-0 block cursor-pointer'>
                <input
                    className='absolute inset-0 opacity-0 pointer-events-none'
                    type="color"
                    onInput={(event: React.ChangeEvent<HTMLInputElement>) => editor.chain().focus().setColor(event.target.value).run()}
                    value={rgb2hex(currentColor)}
                />
            </label>
        </MenuButton>
    );
}
