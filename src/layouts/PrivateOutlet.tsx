import * as React from 'react';
import { useAuth } from '@store/auth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

interface IPrivateOutletProps {
}

export function PrivateOutlet(props: IPrivateOutletProps) {
    const auth = useAuth()
    const location = useLocation();

    if (!auth.isLogedIn) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return (
        <Outlet />
    );
}
