import React, { useState, useEffect } from 'react'
//used for redirection
import { useNavigate } from 'react-router-dom'

const SignUp = () => {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    //This is for restricting user to navigate to signup if already signedup
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    });

    const collectData = async () => {
        console.warn(name, email, password);
        let result = await fetch('http://localhost:5000/register', {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        result = await result.json();
        console.warn(result);

        if (result) {
            navigate('/');
            localStorage.setItem('auth', JSON.stringify(result.auth));
            localStorage.setItem('user', JSON.stringify(result.user));
        }
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Register</h1>

            <div className="col-md-6 mx-auto">
                <div className="form-group mb-3">
                    <input
                        className="form-control"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Name"
                    />
                </div>

                <div className="form-group mb-3">
                    <input
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        placeholder="Enter Email"
                    />
                </div>

                <div className="form-group mb-3">
                    <input
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Enter Password"
                    />
                </div>

                <button className="btn btn-primary w-100" onClick={collectData} type="button">Sign Up</button>
            </div>
        </div>
    )
}

export default SignUp;