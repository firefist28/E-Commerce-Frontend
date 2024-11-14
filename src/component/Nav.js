import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import luffyImage from '../resources/luffy.jpg';


const Nav = () => {

    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/signUp');
    }

    return (
        <div >
            <img src={luffyImage}
                alt='logo'
                className='logo' />
            {auth ?
                <ul className="nav-ul">
                    <li><Link to="/">Products</Link></li>
                    <li><Link to="/add">Add Product</Link></li>
                    <li><Link to="/update">Update Product</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link onClick={logout} to='/login'>Logout ({JSON.parse(auth).name})</Link></li>
                </ul>
                :
                <ul className="nav-ul nav-right">
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signUp">Sign Up</Link></li>
                </ul>
            }
        </div >
    )

    //<>...</> is a fragmentation for wrapping multiple items
}

export default Nav;