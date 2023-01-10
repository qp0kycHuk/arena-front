import { Editor } from '@tiptap/react';
import * as React from 'react';
import { MenuButton } from './MenuButton';
import { ImageIcon } from '@assets/icons/stroke';
import { filePasteHandler } from '@lib/Editor/file-paste-extension';

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
            <label className='block absolute inset-0 cursor-pointer'>
                <input onChange={changeHandler} type="file" multiple accept='image/*' className='opacity-0 absolute inset-0 pointer-events-none' />
            </label>
            <ImageIcon className="text-2xl" />
        </MenuButton>
    );
}
