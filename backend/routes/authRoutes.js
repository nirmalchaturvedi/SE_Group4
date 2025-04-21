const express = require('express');
const router = express.Router();

const {
  sendOTP,
  verifyOTP,
  registerUser, // 👈 Make sure this is imported
} = require('../controller/authController');

// Route to send OTP
router.post('/send-otp', sendOTP);

// Route to verify OTP
router.post('/verify-otp', verifyOTP);

// ✅ Route to register user after OTP
router.post('/register', registerUser); // 👈 This was missing!

module.exports = router;
