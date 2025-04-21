import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import AddGreaseProductForm from './AddGreaseProductForm';
import UpdateGreaseProductForm from './UpdateGreaseProductForm';
import DeleteGreaseProductForm from './DeleteGreaseProductForm';

function AdminDashboard() {
    const [enquiries, setEnquiries] = useState([]);
    const [greaseProducts, setGreaseProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [activeForm, setActiveForm] = useState(null); // 'add', 'update', 'delete'
    const [productName, setProductName] = useState('');
    const [productCategory, setProductCategory] = useState('');

    const navigate = useNavigate();

    // Fetch data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [enquiriesRes, productsRes] = await Promise.all([
                    fetch('http://localhost:5000/api/contact'),
                    fetch('http://localhost:5000/api/grease')
                ]);
                
                const enquiriesData = await enquiriesRes.json();
                const productsData = await productsRes.json();
                
                if (!enquiriesRes.ok) throw new Error(enquiriesData.message || 'Failed to fetch enquiries');
                if (!productsRes.ok) throw new Error(productsData.message || 'Failed to fetch products');
                
                setEnquiries(enquiriesData);
                setGreaseProducts(productsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate('/');
    };

    // Form handlers
    const showAddForm = () => {
        setActiveForm('add');
        setSelectedProduct(null);
    };

    const handleUpdateClick = () => {
        if (!productName || !productCategory) {
            setError('Please select both product name and category');
            return;
        }
        
        const product = greaseProducts.find(p => 
            p.name === productName && p.category === productCategory
        );
        
        if (!product) {
            setError('Product not found');
            return;
        }
        
        setSelectedProduct(product);
        setActiveForm('update');
        setError('');
    };

    const handleDeleteClick = () => {
        if (!productName || !productCategory) {
            setError('Please select both product name and category');
            return;
        }
        
        const product = greaseProducts.find(p => 
            p.name === productName && p.category === productCategory
        );
        
        if (!product) {
            setError('Product not found');
            return;
        }
        
        setSelectedProduct(product);
        setActiveForm('delete');
        setError('');
    };

    const closeAllForms = () => {
        setActiveForm(null);
        setSelectedProduct(null);
    };

    const refreshProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/grease');
            const data = await response.json();
            if (response.ok) {
                setGreaseProducts(data);
            } else {
                throw new Error(data.message || 'Failed to refresh products');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    // Get unique categories for dropdown
    const categories = [...new Set(greaseProducts.map(p => p.category))];

    return (
        <div className="admin-container">
            <div className="dashboard-header">
                <h2>Admin Dashboard</h2>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p className="error-message">{error}</p>}

            <div className="products-section">
                <h3>Grease Products</h3>
                <button onClick={showAddForm}>Add New Grease Product</button>
                
                {/* Product Selection Section for Update/Delete */}
                <div className="update-delete-section">
                    <h3>Update or Delete Product</h3>
                    <div className="form-group">
                        <label>Select Category</label>
                        <select 
                            value={productCategory} 
                            onChange={(e) => setProductCategory(e.target.value)}
                        >
                            <option value="">Select Category</option>
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Product Name</label>
                        <input 
                            type="text" 
                            value={productName} 
                            onChange={(e) => setProductName(e.target.value)} 
                            placeholder="Enter product name"
                        />
                    </div>
                    <div className="action-buttons">
                        <button 
                            className="update-button" 
                            onClick={handleUpdateClick}
                            disabled={!productName || !productCategory}
                        >
                            Update Product
                        </button>
                        <button 
                            className="delete-button" 
                            onClick={handleDeleteClick}
                            disabled={!productName || !productCategory}
                        >
                            Delete Product
                        </button>
                    </div>
                </div>

                {/* Render forms based on activeForm state */}
                {activeForm === 'add' && (
                    <AddGreaseProductForm 
                        onClose={closeAllForms}
                        onSuccess={() => {
                            closeAllForms();
                            refreshProducts();
                        }}
                    />
                )}

                {activeForm === 'update' && selectedProduct && (
                    <UpdateGreaseProductForm
                        product={selectedProduct}
                        onClose={closeAllForms}
                        onSuccess={() => {
                            closeAllForms();
                            refreshProducts();
                        }}
                    />
                )}

                {activeForm === 'delete' && selectedProduct && (
                    <DeleteGreaseProductForm
                        product={selectedProduct}
                        onClose={closeAllForms}
                        onSuccess={() => {
                            closeAllForms();
                            refreshProducts();
                            // Reset selection after delete
                            setProductName('');
                            setProductCategory('');
                        }}
                    />
                )}

                {/* Products List */}
                {greaseProducts.length === 0 ? (
                    <p>No grease products found.</p>
                ) : (
                    <ul className="product-list">
                        {greaseProducts.map((product) => (
                            <li
                                key={product._id}
                                className="product-card"
                                onClick={() => {
                                    setProductName(product.name);
                                    setProductCategory(product.category);
                                    setError('');
                                }}
                            >
                                <h4>{product.name}</h4>
                                <p>Price: ₹{product.price}</p>
                                <p>Stock: {product.stock}</p>
                                <p>Category: {product.category}</p>
                                <p>Offer: {product.offer ? 'Yes' : 'No'}</p>
                                <img src={product.image} alt={product.name} width="100" />
                                <p className="hint-text"><i>Click to select for update/delete</i></p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Enquiries Section */}
            <div className="enquiries-section">
                <h3>Customer Enquiries</h3>
                {enquiries.length === 0 ? (
                    <p>No enquiries found.</p>
                ) : (
                    <ul className="enquiry-list">
                        {enquiries.map((enquiry) => (
                            <li key={enquiry._id} className="enquiry-card">
                                <p><strong>Name:</strong> {enquiry.name}</p>
                                <p><strong>Email:</strong> {enquiry.email}</p>
                                <p><strong>Message:</strong> {enquiry.message}</p>
                                <p><strong>Date:</strong> {new Date(enquiry.createdAt).toLocaleString()}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;