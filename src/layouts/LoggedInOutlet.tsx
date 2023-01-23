import * as React from 'react';
import { useAuth } from '@store/auth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

interface ILoggedInOutletProps {
}

export function LoggedInOutlet(props: ILoggedInOutletProps) {
    const auth = useAuth()
    const location = useLocation();

    if (auth.isLogedIn) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return (
        <Outlet />
    );
}
