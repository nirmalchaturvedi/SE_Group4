require('dotenv').config(); // Load .env variables

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');  // Bearings
const greaseRoutes = require('./routes/greaseRoutes');    // Grease
const blockRoutes = require('./routes/blockRoutes');      // Blocks
const contactRoutes = require('./routes/contactRoutes');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mehtaEnterprise';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes); // Bearings
app.use('/api/grease', greaseRoutes);    // Grease
app.use('/api/blocks', blockRoutes);     // Blocks
app.use('/api/contact', contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
