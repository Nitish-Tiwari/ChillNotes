import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "../css/login.css"
import logo from "../image/loginlogo.png"
const Login = (props) => {
    const [credentails, setCredentails] = useState({ email: "", password: "" })
    let histroy = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({ email: credentails.email, password: credentails.password })

        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('auth-token', json.authToken);
            props.showAlert("Logged in Successfully", "success")
            histroy("/")
        }
        else {
            props.showAlert("Invalid Details", "danger")
        }
    }
    const onChange = (e) => {
        setCredentails({ ...credentails, [e.target.name]: e.target.value })
    }
    return (
        <div id="wrapper">
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            <div id="signin">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Email address</label>
                        <input type="email" value={credentails.email} onChange={onChange} id="emial" name='email' autoFocus />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={credentails.password} onChange={onChange} name='password' />
                        <span id="showpwd" className="fa fa-eye-slash"></span>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Sign in" />
                    </div>
                </form>
                <div className="hr"></div>
                <Link to="/signup" id="froget-pass">New User Sign Up now</Link>

            </div>
        </div>
    )
}

export default Login