import React, { useState, useEffect } from 'react'
//used for redirection
import { useNavigate } from 'react-router-dom'
import { API_USER_REGISTER } from '../constants/ApiConstants'

const SignUp = () => {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    //This is for restricting user to navigate to signup if already signedup
    useEffect(() => {
        //const auth = localStorage.getItem('user');
        //if (auth) {
        //    navigate('/');
        //}
    });

    const collectData = async () => {
        console.warn(name, email, password);
        let result = await fetch(API_USER_REGISTER, {
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
            //localStorage.setItem('user', JSON.stringify(result.user));
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

                <div className="mb-3 position-relative">
                    <input
                        type={isPasswordVisible ? 'text' : 'password'}
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                        required
                    />
                    <button
                        type="button"
                        className="btn btn-outline-secondary position-absolute end-0 top-0 mt-2 me-2"
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                        style={{ border: 'none', background: 'none' }}
                    >
                        {isPasswordVisible ? 'Hide' : 'Show'}
                    </button>
                </div>

                <button className="btn btn-primary w-100" onClick={collectData} type="button">Sign Up</button>
            </div>
        </div>
    )
}

export default SignUp;