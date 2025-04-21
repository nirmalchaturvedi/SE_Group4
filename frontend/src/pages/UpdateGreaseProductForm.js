import React, { useState, useEffect } from 'react';

function UpdateGreaseProductForm({ productId, onUpdateProduct }) {
    const [productData, setProductData] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`http://localhost:5000/api/grease/${productId}`);
            const data = await response.json();
            setProductData(data);
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProductData({
            ...productData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/grease/${productId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData),
            });

            if (response.ok) {
                const data = await response.json();
                alert(data.message || 'Product updated successfully!');
                onUpdateProduct(); // Refresh products after update
            } else {
                const data = await response.json();
                alert(data.error || 'Failed to update product');
            }
        } catch (error) {
            alert('An error occurred while updating the product');
        }
    };

    if (!productData) return null;

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="category"
                value={productData.category}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="price"
                value={productData.price}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="stock"
                value={productData.stock}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="image"
                value={productData.image}
                onChange={handleChange}
                required
            />
            <label>
                Offer:
                <input
                    type="checkbox"
                    name="offer"
                    checked={productData.offer}
                    onChange={handleChange}
                />
            </label>
            <button type="submit">Update Product</button>
        </form>
    );
}

export default UpdateGreaseProductForm;
