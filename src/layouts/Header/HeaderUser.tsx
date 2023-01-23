import { UserIcon } from '@assets/icons/fill';
import { ToDownIcon } from '@assets/icons/stroke';
import { Button } from '@features/ui';
import { Menu } from '@lib/Menu';
import { useUserQuery } from '@store/auth';
import { getMaskedValue as getMaskedPhone } from '@utils/phoneMaskUtils';
import * as React from 'react';

interface IHeaderUserProps {
}

export function HeaderUser(props: IHeaderUserProps) {
    const { data: user } = useUserQuery(null)

    return (
        <Menu align='end' menuButton={
            <Button variant='text' size='small' className='px-3 ml-4' rounded shadow color='gray'>
                <ToDownIcon className="text-base" />
                <div className="p-1 ml-2 text-white rounded-full bg-gray">
                    <UserIcon />
                </div>
            </Button>
        }>
            <div className="p-2">
                <div className="mb-1 text-xs font-semibold text-gray opacity-90">{user?.first_name} {user?.last_name}</div>
                <div className="mb-5 text-sm">{getMaskedPhone(user?.phone)}</div>
                <Button color='red' variant='light' className='w-full'>Выйти</Button>
            </div>
        </Menu>

    );
}
