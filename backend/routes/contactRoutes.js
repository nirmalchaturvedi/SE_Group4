const express = require('express');
const Contact = require('../models/Contact');
const router = express.Router();

// Submit contact form
router.post('/', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const contact = new Contact({ name, email, message });
        await contact.save();
        res.status(201).json({ message: 'Contact form submitted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
