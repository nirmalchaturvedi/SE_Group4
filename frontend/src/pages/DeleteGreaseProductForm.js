import React, { useState } from 'react';

function DeleteGreaseProductForm({ product, onClose, onSuccess }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState('');

    const handleDelete = async () => {
        if (!window.confirm(`Are you sure you want to permanently delete "${product.name}"?`)) {
            return;
        }

        try {
            setIsDeleting(true);
            setError('');
            
            const response = await fetch(`http://localhost:5000/api/grease/${product._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
                },
            });

            // Handle non-JSON responses
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                throw new Error(text || 'Server returned an invalid response');
            }

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message || 'Failed to delete product');
            }

            onSuccess(); // Refresh the product list
            alert(`"${product.name}" was successfully deleted.`);
        } catch (err) {
            setError(err.message);
            console.error('Delete error:', err);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="delete-form">
            <h3>Confirm Deletion</h3>
            {error && (
                <div className="alert alert-danger">
                    Error: {error}
                </div>
            )}

            <div className="product-info">
                <img src={product.image} alt={product.name} width="150" />
                <div>
                    <h4>{product.name}</h4>
                    <p>Category: {product.category}</p>
                    <p>Price: ${product.price}</p>
                </div>
            </div>

            <div className="form-actions">
                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="btn btn-danger"
                >
                    {isDeleting ? 'Deleting...' : 'Confirm Delete'}
                </button>
                <button
                    onClick={onClose}
                    className="btn btn-secondary"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default DeleteGreaseProductForm;