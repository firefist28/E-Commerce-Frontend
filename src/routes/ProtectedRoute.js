import React from 'react';
import { useSelector } from 'react-redux';
//the Outlet component is a placeholder for child routes within a parent route.It's part of React Router and allows developers to create complex navigation structures in their applications. 
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ roles, children }) => {
    const { user } = useSelector((state) => state);

    if (!user) {
        return <Navigate to="/login" />;
    } if (roles && !roles.includes(user.role)) {
        console.warn(`invalid role -> ${user.role}, required role -> ${roles}`);
        return <Navigate to="/unauthorized" />;
    } else {
        return children;
    }
}

export default ProtectedRoute;