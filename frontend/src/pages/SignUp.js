import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

function SignUp() {
  const [name, setName] = useState(''); // 🆕 name field
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [password, setPassword] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const navigate = useNavigate();

  // Handle sending OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setOtpSent(true); // OTP sent successfully
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('OTP Verified!');
        setIsOtpVerified(true); // OTP verified, allow password input
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle password submission and register user
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert('Please fill in all the required fields!');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }), // ✅ include name
      });
      const data = await response.json();
      if (response.ok) {
        alert('User registered successfully!');
        navigate('/Home'); // Redirect to home
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="signup-page">
      <form className="signup-form">
        <h2>Sign Up</h2>

        {/* Name input */}
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* Email input */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* OTP section */}
        {!otpSent ? (
          <button onClick={handleSendOtp} className="send-otp-button">
            Send OTP
          </button>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button onClick={handleVerifyOtp} className="verify-otp-button">
              Verify OTP
            </button>
          </>
        )}

        {/* Password section (only after OTP is verified) */}
        {isOtpVerified && (
          <div className="password-section">
            <h3>Enter Your Password</h3>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={handlePasswordSubmit}
              className="submit-password-button"
            >
              Submit Password
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default SignUp;
