// routes/handleVerifyOtp.js

const express = require('express');
const router = express.Router();

// OTP verification logic (e.g., comparing OTP with stored OTP in the database)
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  // Implement your OTP verification logic here
  if (otp === storedOtp) {  // storedOtp should be from your database or session
    return res.status(200).json({ message: 'OTP Verified successfully!' });
  } else {
    return res.status(400).json({ error: 'Invalid OTP' });
  }
});

module.exports = router;  // Ensure you're exporting the router properly
