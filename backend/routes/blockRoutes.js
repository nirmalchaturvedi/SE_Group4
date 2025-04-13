const express = require('express');
const Block = require('../models/Block');
const router = express.Router();

// GET all block products
router.get('/', async (req, res) => {
    try {
        const blocks = await Block.find();
        res.status(200).json(blocks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST a new block product
router.post('/', async (req, res) => {
    try {
        const { name, category, price, stock, image, offer } = req.body;
        const block = new Block({ name, category, price, stock, image, offer });
        await block.save();
        res.status(201).json({ message: 'Block product added successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
