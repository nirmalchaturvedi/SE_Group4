const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Assuming you have a User model

// In-memory store for OTPs (replace with DB for production)
const otpStore = {};

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "nirmal.chaturvedi@mitaoe.ac.in",  // Your Gmail
    pass: "qlzj gacb abfz proc",            // Your app password (not real password)
  },
});

// Send OTP handler
const sendOTP = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required." });

  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  otpStore[email] = otp;

  try {
    await transporter.sendMail({
      from: '"Mehta Enterprise" <nirmal.chaturvedi@mitaoe.ac.in>',
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}`,
    });

    res.status(200).json({ message: "OTP sent successfully." });
  } catch (error) {
    console.error("Email send error:", error);
    res.status(500).json({ message: "Failed to send OTP." });
  }
};

// Verify OTP handler
const verifyOTP = (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) return res.status(400).json({ message: "Email and OTP are required." });

  if (otpStore[email] === otp) {
    delete otpStore[email]; // OTP used, remove it
    return res.status(200).json({ message: "OTP verified successfully." });
  } else {
    return res.status(400).json({ message: "Invalid OTP." });
  }
};

// Register User with password (after OTP verification)
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password are required." });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("User registration error:", error);
    res.status(500).json({ message: "Failed to register user." });
  }
};

module.exports = { sendOTP, verifyOTP, registerUser };
