const express = require('express');
const Grease = require('../models/Grease');
const router = express.Router();

// GET all grease products
router.get('/', async (req, res) => {
    try {
        const greases = await Grease.find();
        res.status(200).json(greases);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST a new grease product
router.post('/', async (req, res) => {
    try {
        const { name, category, price, stock, image, offer } = req.body;
        const grease = new Grease({ name, category, price, stock, image, offer });
        await grease.save();
        res.status(201).json({ message: 'Grease product added successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
