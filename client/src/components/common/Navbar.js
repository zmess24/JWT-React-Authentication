import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

export default ({currentUser}) => {
    return (
        <nav className="nav clearfix">
            <div className="float-left">
                <span className="nav-link">JWT</span>
                <Link className="nav-link" to="/">Home</Link>
                <Link className="nav-link" to="/vip">VIP</Link>
            </div>
            <div className="float-right">
                {currentUser
                    ? (
                        <span>
                            <Link className="nav-link" to="/profile">Profile</Link>
                            <Link className="nav-link" to="/logout">Logout</Link>
                        </span>
                    )
                    : (
                        <span>
                            <Link className="nav-link" to="/login">Login</Link>
                            <Link className="nav-link" to="/signup">Signup</Link>
                        </span>
                    )
                }
            </div>
        </nav>
    )
};