import { ChangeEvent } from 'react';
import { PlusIcon } from '@assets/icons/stroke';
import { Button } from '@features/ui';

interface IUploaderLabelProps {
    uploader: IUplodaer
}

export function UploaderLabel({ uploader }: IUploaderLabelProps) {

    function changeHandler(event: ChangeEvent<HTMLInputElement>) {
        uploader.addItems(Array.from(event.target.files || []))
        
    }

    return (
        <label className="relative z-10 flex w-32 h-24 transition cursor-pointer bg-primary bg-opacity-10 hover:bg-opacity-20 rounded-xl">
            <input type="file" multiple={uploader.multiple} accept={uploader.extention.accept} onChange={changeHandler} className='absolute inset-0 opacity-0 pointer-events-none' />
            <Button as='div' className='m-auto' variant='whitebg' shadow rounded icon>
                <PlusIcon className="text-2xl" />
            </Button>
        </label>
    );
}
