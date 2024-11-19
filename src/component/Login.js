import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    });

    const handleLogin = async () => {
        let result = await fetch('http://localhost:5000/login', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.warn(result);

        if (result.auth) {
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('auth', JSON.stringify(result.auth));
            navigate('/');
        } else {
            alert('Email or password incorrect');
        }
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
                >
                    Login
                </button>
            </div>
        </div >
    )
}

export default Login;