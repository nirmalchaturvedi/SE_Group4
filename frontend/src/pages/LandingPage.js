import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Import the CSS file for styling

function LandingPage() {
    return (
        <div className="landing-page">
            <h1>Welcome to Mehta Enterprise</h1>
            <p className="landing-description">Your trusted partner for industrial bearings and products.</p>
            <div className="landing-buttons">
                <Link to="/signin">
                    <button className="landing-button">Sign In</button>
                </Link>
                <Link to="/signup">
                    <button className="landing-button">Sign Up</button>
                </Link>
            </div>
        </div>
    );
}

export default LandingPage;
