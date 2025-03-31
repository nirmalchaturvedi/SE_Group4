import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear any authentication tokens or session data
        navigate('/signin');
    };

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');
                const data = await response.json();
                setFeaturedProducts(data.slice(0, 4)); // Display the first 4 products as featured
            } catch (err) {
                console.error(err);
            }
        };
        fetchFeaturedProducts();
    }, []);

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
            <main className="home-content">
                <div className="hero-section">
                    <h2>Welcome to Mehta Enterprise</h2>
                    <p>Your one-stop shop for all types of bearings and industrial products.</p>
                    <Link to="/products">
                        <button className="explore-button">Explore Products</button>
                    </Link>
                </div>
                <section className="featured-products">
                    <h3>Featured Products</h3>
                    <div className="products-grid">
                        {featuredProducts.map((product) => (
                            <div key={product._id} className="product-card">
                                <img src={product.image} alt={product.name} className="product-image" />
                                <h4>{product.name}</h4>
                                <p>Price: ${product.price}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Home;
