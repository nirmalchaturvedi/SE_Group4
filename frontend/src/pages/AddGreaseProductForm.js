import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function AddGreaseProductForm({ onAddProduct }) {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        stock: '',
        image: '',
        offer: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/grease', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message || 'Product added successfully!');
                onAddProduct();  // Refresh products
            } else {
                const data = await response.json();
                alert(data.error || 'Failed to add product');
            }
        } catch (error) {
            alert('An error occurred while adding the product');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={formData.stock}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={formData.image}
                onChange={handleChange}
                required
            />
            <label>
                Offer:
                <input
                    type="checkbox"
                    name="offer"
                    checked={formData.offer}
                    onChange={handleChange}
                />
            </label>
            <button type="submit">Add Product</button>
        </form>
    );
}

export default AddGreaseProductForm;
