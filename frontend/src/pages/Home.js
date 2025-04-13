import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    const productCategories = [
        {
            name: 'Bearings',
            image: '/image/Bearing.jpeg' // Update with your actual image paths
        },
        {
            name: 'Grease',
            image: '/image/Grease.jpg'
        },
        {
            name: 'Blocks',
            image: '/image/Blocks.jpeg'
        }
    ];

    return (
        <div className="home-wrapper">
            <header className="fixed-navbar">
                <nav className="navbar">
                    <div className="navbar-brand">Mehta Enterprise</div>
                    <div className="navbar-menu">
                        <ul className="navbar-links">
                            <li><Link to="/home">Home</Link></li>
                            <li><Link to="/products">Products</Link></li>
                            <li><Link to="/contact">Contact Us</Link></li>
                        </ul>
                        <button className="logout-button" onClick={handleLogout}>Logout</button>
                    </div>
                </nav>
            </header>
            <main className="home-content">
                <div className="hero-section">
                    <h2>Welcome to <span>Mehta Enterprise</span></h2>
                    <p>Your one-stop shop for all types of bearings and industrial products.</p>
                    <Link to="/products">
                        <button className="explore-button">Explore Products</button>
                    </Link>
                </div>
                <section className="featured-products">
                    <h3>Our Products</h3>
                    <div className="products-grid">
                        {productCategories.map((item, index) => (
                            <div key={index} className="product-card">
                                <img src={item.image} alt={item.name} className="product-image" />
                                <h4>{item.name}</h4>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Home;
