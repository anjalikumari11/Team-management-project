import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function PublicRoute() {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (token && userStr) {
        try {
            const user = JSON.parse(userStr);
            if (user.role === 'Admin') {
                return <Navigate to="/dashboard" replace />;
            } else {
                return <Navigate to="/user-dashboard" replace />;
            }
        } catch (error) {
            return <Outlet />;
        }
    }

    return <Outlet />;
}

export default PublicRoute;
