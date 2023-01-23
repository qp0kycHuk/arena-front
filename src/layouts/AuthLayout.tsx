import background from '@assets/img/auth-background.jpg';
import { Suspense } from 'react';
import { LoggedInOutlet } from './LoggedInOutlet';

interface IAuthLayoutProps {
}

export function AuthLayout(props: IAuthLayoutProps) {
    return (
        <div className='flex flex-grow bg-cover' style={{ backgroundImage: 'url(' + background + ')' }}>
            <Suspense fallback='Loading..'>
                <LoggedInOutlet />
            </Suspense>
        </div>
    );
}
