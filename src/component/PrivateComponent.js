import React from 'react';
//the Outlet component is a placeholder for child routes within a parent route.It's part of React Router and allows developers to create complex navigation structures in their applications. 
import { Navigate, Outlet } from 'react-router-dom';

const PrivateComponent = () => {

    const auth = localStorage.getItem('user');

    //if user is not stored locally then be in register page
    return auth ? <Outlet /> : <Navigate to='/signUp' />
}

export default PrivateComponent;