import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <header className="custom-navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    <img 
                        src={process.env.PUBLIC_URL + "/image/copy.png"} 
                        alt="Mehta Enterprise Logo"
                        className="navbar-logo"
                    />
                </Link>

                <ul className="navbar-links">
                    <li><Link to="/Reviews">Reviews</Link></li>
                    <li><Link to="/products">Products</Link></li>
                    <li><Link to="/ReviewsForm">Give a Review</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
                
                <Link to="/admin">
                    <button className="contact-button">Admin Login</button>
                </Link>
            </div>
        </header>
    );
}

export default Navbar;