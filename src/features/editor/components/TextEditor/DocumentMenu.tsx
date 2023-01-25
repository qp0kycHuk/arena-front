import type { Editor } from '@tiptap/react';
import * as React from 'react';
import { MenuButton } from './MenuButton';
import { DocumentIcon } from '@assets/icons/stroke';
import { filePasteHandler } from '../../lib/file-paste-extension';


interface IDocumentMenuProps {
    editor: Editor
}

export function DocumentMenu({ editor }: IDocumentMenuProps) {
    function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files) {
            filePasteHandler(Array.from(event.target.files), editor);
        }
    }

    return (
        <MenuButton title='Файл' className='relative'>
            <label className='absolute inset-0 block cursor-pointer'>
                <input onChange={changeHandler} type="file" multiple
                    accept='application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf'
                    className='absolute inset-0 opacity-0 pointer-events-none' />
            </label>
            <DocumentIcon className="text-2xl" />
        </MenuButton>
    );
}
