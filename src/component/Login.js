import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { API_USER_LOGIN } from '../constants/ApiConstants';
import { login } from '../states/actions/authAction';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        setIsLoading(true);
        let result = await fetch(API_USER_LOGIN, {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.warn(result);

        if (result.auth) {
            dispatch(login(result.user));
            localStorage.setItem('auth', JSON.stringify(result.auth));
            toast.success('Welcome ' + result.user.name);
            navigate('/products');
        } else {
            toast.error('Email or password incorrect');
        }
        setIsLoading(false);
    }

    return (
        <div className="container mt-5">
            <div className="col-md-6 mx-auto">
                <h1 className="text-center mb-4">Login</h1>
                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Email"
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                        required
                    />
                </div>
                <button
                    className="btn btn-primary w-100"
                    onClick={handleLogin}
                    type="button"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                            ></span>{' '}
                            Logging in...
                        </>
                    ) : (
                        'Login'
                    )}
                </button>
            </div>
        </div >
    )
}

export default Login;