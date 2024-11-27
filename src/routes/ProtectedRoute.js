import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../states/actions/authAction';
import { toast } from 'react-toastify';
//the Outlet component is a placeholder for child routes within a parent route.It's part of React Router and allows developers to create complex navigation structures in their applications. 
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ roles, children }) => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const isSessionExpired = (sessionExpiryTime) => {
        const currentTime = new Date().getTime();
        return sessionExpiryTime && currentTime > sessionExpiryTime;
    };

    if (!user) {
        return <Navigate to="/login" />;
    } else if (isSessionExpired(user.sessionExpiryTime)) {
        console.warn(`session expired`);
        localStorage.clear();
        dispatch(logout());
        toast.info('Session Expire. Please Login Again!');
    } else if (roles && !roles.includes(user.role)) {
        console.warn(`invalid role -> ${user.role}, required role -> ${roles}`);
        return <Navigate to="/unauthorized" />;
    } else {
        return children;
    }
}

export default ProtectedRoute;