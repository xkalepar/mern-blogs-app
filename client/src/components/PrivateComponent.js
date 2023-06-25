import React from 'react';
import {
    Navigate,
    Outlet,
} from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({redirectPath = '/register' }) => {
    const {isLoggedIn} = useAuth();
    if (!isLoggedIn) {
        return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
};
export default ProtectedRoute;