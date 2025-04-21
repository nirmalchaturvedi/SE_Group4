const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otp: { type: String, required: false },  // Field for storing OTP
    otpExpires: { type: Date, required: false },  // Field to track OTP expiry time
    otpVerified: { type: Boolean, default: false },  // Flag to track OTP verification status
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
