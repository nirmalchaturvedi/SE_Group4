import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

function Home() {
    const navigate = useNavigate();

    const handleAdminLogin = () => {
        navigate('/admin-login');
    };

    const goToProducts = () => {
        navigate('/products');
    };

    const productCategories = [
        {
            name: 'Bearings',
            image: '/image/Bearing.jpeg',
            route: 'http://localhost:3000/products'
        },
        {
            name: 'Grease',
            image: '/image/Grease.jpg',
            route: 'http://localhost:3000/products'
        },
        {
            name: 'Blocks',
            image: '/image/Blocks.jpeg',
            route: 'http://localhost:3000/products'
        }
    ];

    const handleProductClick = (url) => {
        window.open(url, '_blank');
    };

    return (
        <div className="home-wrapper">
            <header className="fixed-navbar">
                <nav className="navbar">
                    <div className="navbar-brand">Mehta Enterprises</div>
                    <div className="navbar-menu">
                        <ul className="navbar-links">
                            <li><Link to="/home">Home</Link></li>
                            <li><Link to="/products">Products</Link></li>
                            <li><Link to="/contact">Contact Us</Link></li>
                        </ul>
                        <button className="admin-login-button" onClick={handleAdminLogin}>
                            Admin Login
                        </button>
                    </div>
                </nav>
            </header>

            <main className="home-content">
                <div className="hero-section">
                    <h2>Welcome to <span>Mehta Enterprises</span></h2>
                    <p>Precision-engineered bearings for industrial excellence since 1985.</p>
                    
                    <div className="bearing-animation-container">
                        <div className="bearing-outer-ring">
                            <div className="bearing-cage"></div>
                            <div className="bearing-inner-ring">
                                <div className="bearing-balls">
                                    {[...Array(8)].map((_, i) => (
                                        <div key={i} className="bearing-ball"></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <button className="cta-button" onClick={goToProducts}>
                            Discover Our Products
                        </button>
                    </div>
                </div>

                <div className="company-showcase">
                    <div className="showcase-block">
                        <img 
                            src="/image/factory.jpg" 
                            alt="Mehta Enterprises Factory" 
                            className="showcase-image"
                        />
                        <div className="showcase-caption">
                            <h3>Our Manufacturing Facility</h3>
                            <p>State-of-the-art production with quality control at every stage</p>
                        </div>
                    </div>
                    <div className="showcase-block">
                        <img 
                            src="/image/team.jpg" 
                            alt="Mehta Enterprises Team" 
                            className="showcase-image"
                        />
                        <div className="showcase-caption">
                            <h3>Expert Engineering Team</h3>
                            <p>Over 100 years of combined bearing expertise</p>
                        </div>
                    </div>
                </div>

                <section className="featured-products">
                    <h3>Our Product Categories</h3>
                    <div className="products-grid">
                        {productCategories.map((item, index) => (
                            <div
                                key={index}
                                className="product-card"
                                onClick={() => handleProductClick(item.route)}
                                style={{ cursor: 'pointer' }}
                            >
                                <img src={item.image} alt={item.name} className="product-image" />
                                <h4>{item.name}</h4>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="address-box">
                    <h3>Visit Us</h3>
                    <div className="address-content">
                        <div className="address-item">
                            <FaMapMarkerAlt className="address-icon" />
                            <p>123 Industrial Park,<br />Mumbai - 400001,<br />Maharashtra, India</p>
                        </div>
                        <div className="address-item">
                            <FaPhone className="address-icon" />
                            <p>+91 22 1234 5678</p>
                        </div>
                        <div className="address-item">
                            <FaEnvelope className="address-icon" />
                            <p>info@mehtaenterprises.com</p>
                        </div>
                        <div className="address-item">
                            <FaClock className="address-icon" />
                            <p>Mon-Fri: 9AM - 6PM<br />Sat: 9AM - 1PM</p>
                        </div>
                    </div>
                    <div className="address-map">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.755837627968!2d72.8328643149003!3d19.01798898711338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cee9f3f7d1e5%3A0x6b7e5b5b5b5b5b5b!2sIndustrial%20Park!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
                            width="100%" 
                            height="300" 
                            style={{ border: 0 }} 
                            allowFullScreen="" 
                            loading="lazy"
                            title="Mehta Enterprises Location"
                        ></iframe>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Home;