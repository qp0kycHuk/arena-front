import { useState } from 'react';

import { toast } from '@lib/Toast';
import { useAuth, useLogout } from '@store/auth';
import { Spiner } from '@components/Spiner';
import { Button, Menu, MenuItem } from '@features/ui';
import { ToDownIcon } from '@assets/icons/stroke';
import { UserIcon } from '@assets/icons/fill';
import { getMaskedPhoneValue, getRoute } from '@utils/index';
import { SERVER_ERROR_MESSAGE } from '@utils/const/text';
import { Link } from 'react-router-dom';

interface IHeaderUserProps {
}

export function HeaderUser(props: IHeaderUserProps) { 
    const { user } = useAuth()
    const [logout] = useLogout()
    const [loading, setLoading] = useState(false)

    async function logoutHandler() {
        setLoading(true)
        try {
            await logout()
        } catch (error) {
            toast.error(SERVER_ERROR_MESSAGE)
        }
        setLoading(false)
    }

    return (
        <Menu align='end' menuButton={
            <Button variant='text' size='small' className='px-3 ml-4' rounded shadow color='gray'>
                <ToDownIcon className="text-base" />
                <div className="w-[22px] h-[22px] flex ml-2 text-white rounded-full bg-gray">
                    <UserIcon className="m-auto" />
                </div>
            </Button>
        }>
            <div className="p-2">
                <MenuItem>
                    <Link to={getRoute().users(user?.id)} className="mb-1 text-xs font-semibold text-gray opacity-90">
                        {user?.first_name} {user?.last_name}
                    </Link>
                </MenuItem>
                <div className="mb-5 text-sm">{getMaskedPhoneValue(user?.phone)}</div>
                <Button disabled={loading} onClick={logoutHandler} color='red' variant='light' className='w-full'>
                    {loading ? <Spiner /> : 'Выйти'}
                </Button>
            </div>
        </Menu>

    );
}
