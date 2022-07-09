import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "../css/signup.css";
import logo from "../image/loginlogo.png"
const Signup = (props) => {
    const [credentails, setCredentails] = useState({ name: "", email: "", password: "", cpassword: "" })
    let histroy = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, cpassword } = credentails;
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({ name, email, password })

        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('auth-token', json.authToken);
            histroy("/");
            props.showAlert("Account Created Successgully", "success")
        }
        else {
            props.showAlert("Invalid Credentails", "danger")
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
                        <label htmlFor="username">Name</label>
                        <input type="text" onChange={onChange} id="name" name='name' autoFocus />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Email address</label>
                        <input type="email" onChange={onChange} id="email" name='email' />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={credentails.password} onChange={onChange} name='password' minLength={5} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cpassword">Confirm Password</label>
                        <input type="password" id="cpassword" value={credentails.cpassword} onChange={onChange} name='cpassword' minLength={5} required />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Sign Up" />
                    </div>
                </form>
                <div className="hr"></div>
                <Link to="/login" id="froget-pass">Already user? Login here</Link>

            </div>
        </div>
    )
}

export default Signup