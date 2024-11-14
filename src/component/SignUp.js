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
            localStorage.setItem('user', JSON.stringify(result));
        }
    }

    return (
        <div className="register">
            <h1>Register</h1>

            <div >
                <input className="inputBox" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" />
                <input className="inputBox" value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Enter Email" />
                <input className="inputBox" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Password" />
                <button className="appButton" onClick={collectData} type="button">Sign Up</button>

            </div>

        </div >
    )
}

export default SignUp;