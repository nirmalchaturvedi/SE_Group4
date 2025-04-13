import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ContactUs.css';

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
        }
    };

    return (
        <div>
            <header className="navbar">
                <div className="navbar-brand">Mehta Enterprise</div>
                <nav>
                    <ul className="navbar-links">
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                        <li><button className="logout-button" onClick={handleLogout}>Logout</button></li>
                    </ul>
                </nav>
            </header>
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
            </main>
        </div>
    );
}

export default ContactUs;
