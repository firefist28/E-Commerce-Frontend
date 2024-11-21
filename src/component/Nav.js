import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import luffyImage from '../resources/luffy.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const Nav = () => {

    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/signUp');
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                {/* Logo */}
                <Link to="/" className="navbar-brand">
                    E-Commerce
                </Link>

                {/* Toggle button for mobile view */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar links */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {auth ? (
                            <>
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">Products</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/add" className="nav-link">Add Product</Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        onClick={logout}
                                        to="/login"
                                        className="nav-link text-danger"
                                    >
                                        Logout ({JSON.parse(auth).name})
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/signUp" className="nav-link">Sign Up</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )

    //<>...</> is a fragmentation for wrapping multiple items
}

export default Nav;