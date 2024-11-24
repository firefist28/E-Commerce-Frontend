import React from 'react';
import { useSelector } from 'react-redux';
//the Outlet component is a placeholder for child routes within a parent route.It's part of React Router and allows developers to create complex navigation structures in their applications. 
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoutes = () => {
    const { user } = useSelector((state) => state);

    if (user) {
        return <Navigate to="/products" />;
    }
    else {
        return <Outlet />
    }
}

export default PublicRoutes;