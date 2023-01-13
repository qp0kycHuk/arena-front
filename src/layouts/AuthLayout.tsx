import { Outlet } from 'react-router-dom';
import background from '@assets/img/auth-background.jpg';
import { Suspense } from 'react';

interface IAuthLayoutProps {
}

export function AuthLayout(props: IAuthLayoutProps) {
    return (
        <div className='flex flex-grow bg-cover' style={{ backgroundImage: 'url(' + background + ')' }}>
            <Suspense fallback='Loading..'>
                <Outlet />
            </Suspense>
        </div>
    );
}
