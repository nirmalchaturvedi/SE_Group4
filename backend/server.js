require('dotenv').config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');   // Bearings
const greaseRoutes = require('./routes/greaseRoutes');     // Grease
const blockRoutes = require('./routes/blockRoutes');       // Blocks
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');         // OTP routes
const handleVerifyOtp = require('./routes/handleVerifyOtp'); // OTP verification route
const reviewRoutes = require('./routes/reviewRoutes.js');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://nirmal123456:12345abcdA@cluster0.dk3h6.mongodb.net/podcast';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);   // Bearings
app.use('/api/grease', greaseRoutes);      // Grease
app.use('/api/blocks', blockRoutes);       // Blocks
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);          // OTP email verification routes
app.use('/api/otp', handleVerifyOtp);      // Use handleVerifyOtp route for OTP verification
app.use('/api/reviews', reviewRoutes);
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
