import { Editor } from '@tiptap/react';
import * as React from 'react';
import { MenuButton } from './MenuButton';
import { ImageIcon } from '@assets/icons/stroke';
import { filePasteHandler } from '../../lib/file-paste-extension';

export interface IImageMenuProps {
    editor: Editor
}

export function ImageMenu({ editor }: IImageMenuProps) {
    function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files) {
            filePasteHandler(Array.from(event.target.files), editor);
        }
    }
    
    return (
        <MenuButton title='Изображение' className='relative'>
            <label className='absolute inset-0 block cursor-pointer'>
                <input onChange={changeHandler} type="file" multiple accept='image/*' className='absolute inset-0 opacity-0 pointer-events-none' />
            </label>
            <ImageIcon className="text-2xl" />
        </MenuButton>
    );
}
