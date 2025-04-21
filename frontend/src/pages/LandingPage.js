import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import Navbar from './Navbar'; // Import your existing Navbar component
import './Navbar.css'; // Ensure correct path to your CSS file

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
            <Navbar onAdminLogin={handleAdminLogin} />

            <main className="home-content">
                <div className="hero-section">
                    <h2>Welcome to <span>Mehta Enterprises</span></h2>
                    <p>Precision-engineered bearings for industrial excellence since 1985.</p>
                    
                    <div className="logo-container">
                        <img 
                            src="/image/BEARINGlogo.jpg" 
                            alt="Mehta Enterprises Logo" 
                            className="company-logo"
                        />
                        <button className="cta-button" onClick={goToProducts}>
                            Discover Our Products
                        </button>
                    </div>
                </div>

                <div className="company-showcase">
                    <div className="showcase-block">
                        <img 
                            src="/image/image1.png" 
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
                            src="/image/image1.png" 
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
                            <p>
                                Shop No 2 & 4, Annasaheb, Shiv Apartments<br />
                                Magar Stadium Rd, Yashwantnagar<br />
                                Pimpri Colony, Pune, Pimpri-Chinchwad,<br />
                                Maharashtra 411018
                            </p>
                        </div>
                        <div className="address-item">
                            <FaPhone className="address-icon" />
                            <p>+91 20 2765 4321</p>
                        </div>
                        <div className="address-item">
                            <FaEnvelope className="address-icon" />
                            <p>sales@mehtaenterprises.com</p>
                        </div>
                        <div className="address-item">
                            <FaClock className="address-icon" />
                            <p>Mon-Fri: 9AM - 6PM<br />Sat: 9AM - 1PM</p>
                        </div>
                    </div>

                    <div className="address-map">
                        <iframe
                            src="https://www.google.com/maps?q=18.63939927194217,73.82206602157333&z=16&output=embed"
                            width="100%"
                            height="400"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Mehta Enterprises Location"
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Home;