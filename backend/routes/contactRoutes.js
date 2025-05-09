// routes/contactRoutes.js
const express = require('express');
const Contact = require('../models/Contact');
const router = express.Router();

// POST route to save a contact
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

// ✅ GET route to fetch all contacts
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch enquiries' });
    }
});

module.exports = router;
