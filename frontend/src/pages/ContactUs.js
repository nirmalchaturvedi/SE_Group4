import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ContactUs.css';
import Navbar from './Navbar'; // Import your existing Navbar component
import './Navbar.css'; // Ensure correct path to your CSS file

function ContactUs() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear any authentication tokens or session data
        navigate('/');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message }),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Message sent successfully');
                setName('');
                setEmail('');
                setMessage('');
            } else {
                alert(data.error);
            }
        } catch (err) {
            console.error(err);
            alert('Something went wrong. Please try again later.');
        }
    };

    const goBackToHome = () => {
        navigate('/home');  // Navigate to the home page
    };

    return (
        <div>
            <Navbar></Navbar>
            <main className="contact-page">
                <h2>Contact Us</h2>
                <p className="contact-description">We'd love to hear from you! Please fill out the form below.</p>
                <form onSubmit={handleSubmit} className="contact-form">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                    <button type="submit" className="submit-button">Send</button>
                </form>
                {/* Go back button */}
                <button onClick={goBackToHome} className="go-back-button">
                    Go Back to Home
                </button>
            </main>
        </div>
    );
}

export default ContactUs;
