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

// GET a single grease product by ID
router.get('/:id', async (req, res) => {
    try {
        const grease = await Grease.findById(req.params.id);
        if (!grease) {
            return res.status(404).json({ message: 'Grease product not found' });
        }
        res.status(200).json(grease);
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

// PUT (update) a grease product by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedGrease = await Grease.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedGrease) {
            return res.status(404).json({ message: 'Grease product not found' });
        }
        res.status(200).json({ message: 'Grease product updated', updatedGrease });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE a grease product by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedGrease = await Grease.findByIdAndDelete(req.params.id);
        if (!deletedGrease) {
            return res.status(404).json({ message: 'Grease product not found' });
        }
        res.status(200).json({ message: 'Grease product deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
