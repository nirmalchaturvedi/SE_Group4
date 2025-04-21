import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Products.css';
import Navbar from './Navbar'; // Import your existing Navbar component
import './Navbar.css'; // Ensure correct path to your CSS file

function Products() {
    const [bearings, setBearings] = useState([]);
    const [grease, setGrease] = useState([]);
    const [blocks, setBlocks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('bearings');
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/', { replace: true });
    };
    
    useEffect(() => {
        const fetchBearings = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/products');
                const data = await res.json();
                setBearings(data);
            } catch (err) {
                console.error(err);
            }
        };

        const fetchGrease = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/grease');
                const data = await res.json();
                setGrease(data);
            } catch (err) {
                console.error(err);
            }
        };

        const fetchBlocks = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/blocks');
                const data = await res.json();
                setBlocks(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchBearings();
        fetchGrease();
        fetchBlocks();
    }, []);

    const renderProducts = (productsArray) => (
        <div className="products-grid">
            {productsArray.map((product) => (
                <div key={product._id} className={`product-card ${product.offer ? 'offer' : ''}`}>
                    <img src={product.image} alt={product.name} className="product-image" />
                    <h3>{product.name}</h3>
                    <p>Category: {product.category}</p>
                    <p className="product-price">₹{product.price.toLocaleString('en-IN')}</p>
                    <p className="product-stock">Stock: {product.stock}</p>
                    {product.offer && <span className="offer-badge">Special Offer</span>}
                </div>
            ))}
        </div>
    );

    return (
        <div className="products-wrapper">
             <Navbar></Navbar>
            <header className="navbar fixed-navbar">
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
                <p className="products-description">
                    Browse our wide range of products across multiple categories.
                </p>

                <div className="category-buttons">
                    <button
                        className={`category-btn ${selectedCategory === 'bearings' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory('bearings')}
                    >
                        Bearings
                    </button>
                    <button
                        className={`category-btn ${selectedCategory === 'grease' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory('grease')}
                    >
                        Grease
                    </button>
                    <button
                        className={`category-btn ${selectedCategory === 'blocks' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory('blocks')}
                    >
                        Blocks
                    </button>
                </div>

                {selectedCategory === 'bearings' && renderProducts(bearings)}
                {selectedCategory === 'grease' && renderProducts(grease)}
                {selectedCategory === 'blocks' && renderProducts(blocks)}
            </main>
        </div>
    );
}

export default Products;
