import { useState } from 'react';
import { Button, Input } from '@features/ui';

interface ILinksProps {
}

export function Links(props: ILinksProps) {
    const [links, setLinks] = useState([])
    return (
        <>
            <div className='flex gap-4'>
                <div>
                    <div className="text-sm mb-2 font-medium">Заголовок</div>
                    <Input className='w-96' />
                </div>
                <div>
                    <div className="text-sm mb-2 font-medium">Ссылка</div>
                    <Input className='w-96' />
                </div>
            </div>
            <Button variant='text' className='mt-2'>Добавить ссылку</Button>
        </>
    );
}
