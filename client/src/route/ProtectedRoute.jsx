import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = ({allowedRoles=[]}) => {
    const user = useSelector((state)=> state.user);
    const role = user?.role;

    const isAllowed = allowedRoles.includes(role);

    if(!isAllowed){
        return (
            <Navigate to='/' replace />
        )
    }
    return <Outlet />
}

export default ProtectedRoute