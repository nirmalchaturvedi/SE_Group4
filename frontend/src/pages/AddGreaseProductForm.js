import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddGreaseProductForm.css';

function AddGreaseProductForm({ onAddProduct }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        stock: '',
        image: '',
        offer: false,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        // Format price input with INR validation
        if (name === 'price') {
            const numericValue = value.replace(/[^0-9.]/g, '');
            setFormData(prev => ({
                ...prev,
                [name]: numericValue
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value,
            }));
        }
    };

    const validateForm = () => {
        if (!formData.name.trim()) return 'Product name is required';
        if (!formData.category.trim()) return 'Category is required';
        if (isNaN(formData.price) || formData.price <= 0) return 'Valid price is required';
        if (isNaN(formData.stock) || formData.stock < 0) return 'Valid stock quantity is required';
        if (!formData.image.trim()) return 'Image URL is required';
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/grease', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            
            if (response.ok) {
                setSuccess(data.message || 'Product added successfully!');
                setFormData({
                    name: '',
                    category: '',
                    price: '',
                    stock: '',
                    image: '',
                    offer: false,
                });
                onAddProduct();
                setTimeout(() => setSuccess(''), 3000);
            } else {
                setError(data.error || 'Failed to add product');
            }
        } catch (error) {
            setError('An error occurred while adding the product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-grease-container">
            <h2>Add New Grease Product</h2>
            
            {error && <div className="alert-message alert-error">{error}</div>}
            {success && <div className="alert-message alert-success">{success}</div>}

            <form onSubmit={handleSubmit} className="add-grease-form">
                <div className="form-group">
                    <label>Product Name:</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter product name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Category:</label>
                    <input
                        type="text"
                        name="category"
                        placeholder="Enter category"
                        value={formData.category}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Price (₹):</label>
                    <input
                        type="number"
                        name="price"
                        placeholder="Enter price"
                        value={formData.price}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                    />
                </div>

                <div className="form-group">
                    <label>Stock Quantity:</label>
                    <input
                        type="number"
                        name="stock"
                        placeholder="Enter stock quantity"
                        value={formData.stock}
                        onChange={handleChange}
                        min="0"
                    />
                </div>

                <div className="form-group">
                    <label>Image URL:</label>
                    <input
                        type="url"
                        name="image"
                        placeholder="Enter image URL"
                        value={formData.image}
                        onChange={handleChange}
                    />
                </div>

                <div className="checkbox-group">
                    <label>
                        <input
                            type="checkbox"
                            name="offer"
                            checked={formData.offer}
                            onChange={handleChange}
                        />
                        On Offer
                    </label>
                </div>

                <div className="form-actions">
                    <button 
                        type="submit" 
                        className="submit-button"
                        disabled={loading}
                    >
                        {loading ? 'Adding...' : 'Add Product'}
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

export default AddGreaseProductForm;