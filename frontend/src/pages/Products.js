import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Products.css';

function Products() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear any authentication tokens or session data
        navigate('/signin');
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProducts();
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
            <main className="products-page">
                <h2>Our Products</h2>
                <p className="products-description">Browse through our wide range of industrial bearings and products.</p>
                <div className="products-grid">
                    {products.map((product) => (
                        <div key={product._id} className={`product-card ${product.offer ? 'offer' : ''}`}>
                            <img src={product.image} alt={product.name} className="product-image" />
                            <h3>{product.name}</h3>
                            <p>Category: {product.category}</p>
                            <p>Price: ${product.price}</p>
                            {product.offer && <span className="offer-badge">Special Offer</span>}
                            <button className="buy-now-button">Buy Now</button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Products;
