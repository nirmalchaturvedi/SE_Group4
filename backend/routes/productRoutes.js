const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new product
router.post('/', async (req, res) => {
    try {
        const { name, category, price, stock, image } = req.body; // Include image
        const product = new Product({ name, category, price, stock, image });
        await product.save();
        res.status(201).json({ message: 'Product added successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
