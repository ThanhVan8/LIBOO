import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
    const user = useSelector((state) => state.auth.login?.currentUser);

    return user ? <Outlet /> : <Navigate to='/Auth' />
}

export default PrivateRoute