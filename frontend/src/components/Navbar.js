import React, { useEffect } from 'react'
import {
    Link, useLocation, useNavigate
} from "react-router-dom";
import logo from "../image/loginlogo.png"
import "../css/navbar.css"
const Navbar = (props) => {
    let history = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        history('/login');
    }
    let location = useLocation();
    useEffect(() => {
    }, [location]);

    return (
        <div className='navb'>
            <nav className="navigationWrapper">
                <Link className="logoWrapper" to="/">
                    <img src={logo} alt="" />
                </Link>
                <ul className="navigation">
                    <li className="parent" ><Link className={`link ${location.pathname === "/" ? "active" : ""}`} style={{ color: `${location.pathname === '/' ? 'red' : 'white'}` }} to="/">Home</Link></li>
                    <li className="parent"><Link className={`link ${location.pathname === "/about" ? "active" : ""}`} style={{ color: `${location.pathname === '/about' ? 'red' : 'white'}` }} to='/about' >About</Link></li>
                    {!localStorage.getItem("auth-token") ? <form className='form'>
                        <li className="parent"><Link className="link" to="/">Login</Link></li>
                        <li className="parent"><Link className="link" to="/signup">SignUp</Link></li>
                    </form> : <li onClick={handleLogout} className='parent link'>Log Out</li>}
                    {localStorage.getItem("auth-token") ? <li className="parent"><Link className={`link ${location.pathname === "/profile" ? "active" : ""}`} style={{ color: `${location.pathname === '/profile' ? 'red' : 'white'}` }} to='/profile' >profile</Link></li>
                        : ""}
                </ul>
            </nav>
        </div>
    )
}

export default Navbar