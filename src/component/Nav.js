import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { logout } from '../states/actions/authAction';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { roles } from '../constants/enums';
import { toast } from 'react-toastify';

const Nav = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const buttonLogoutAction = () => {
        localStorage.clear();
        dispatch(logout());
        toast.info('Logout Successfully!');
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
                        {user ? (
                            <>
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">
                                        Home
                                    </Link>
                                </li>
                                {user.role === roles.ADMIN && (
                                    <li className="nav-item">
                                        <Link to="/add" className="nav-link">
                                            Add Product
                                        </Link>
                                    </li>
                                )}
                                <li className="nav-item">
                                    <Link to="/myProfile" className="nav-link">
                                        My Profile
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link to="/login" onClick={buttonLogoutAction} className="nav-link text-danger">
                                        Logout {user.name}
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/signUp" className="nav-link">
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}
                        <li className="nav-item">
                            <Link to="/about" className="nav-link">
                                About
                            </Link>
                        </li>
                    </ul>
                </div >
            </div >
        </nav >
    )

    //<>...</> is a fragmentation for wrapping multiple items
}

export default Nav;