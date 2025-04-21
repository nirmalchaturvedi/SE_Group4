import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateGreaseProductForm.css';

function UpdateGreaseProductForm() {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [productData, setProductData] = useState({
        name: '',
        category: '',
        price: 0,
        stock: 0,
        image: '',
        offer: false
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                if (!productId) {
                    throw new Error('No product ID provided');
                }

                const response = await fetch(`http://localhost:5000/api/grease/${productId}`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                setProductData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProductData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/grease/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update product');
            }

            navigate('/admin/grease-products', {
                state: { message: 'Product updated successfully!' }
            });
            
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return <div className="loading">Loading product details...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="update-form-container">
            <h2>Update Grease Product</h2>
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Product Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={productData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Category:</label>
                    <input
                        type="text"
                        name="category"
                        value={productData.category}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Price ($):</label>
                    <input
                        type="number"
                        name="price"
                        value={productData.price}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Stock Quantity:</label>
                    <input
                        type="number"
                        name="stock"
                        value={productData.stock}
                        onChange={handleChange}
                        min="0"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Image URL:</label>
                    <input
                        type="text"
                        name="image"
                        value={productData.image}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group checkbox-group">
                    <label>
                        <input
                            type="checkbox"
                            name="offer"
                            checked={productData.offer}
                            onChange={handleChange}
                        />
                        On Offer
                    </label>
                </div>

                <div className="form-actions">
                    <button type="submit" className="submit-button">
                        Update Product
                    </button>
                    <button
                        type="button"
                        className="cancel-button"
                        onClick={() => navigate(-1)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdateGreaseProductForm;