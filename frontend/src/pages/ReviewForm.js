import React, { useState } from 'react';
import { FaStar, FaUser, FaBuilding, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import './reviewform.css';
import Navbar from './Navbar';

const ReviewForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    rating: 0,
    review: '',
    email: ''
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (rating) => {
    setFormData({ ...formData, rating });
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required';
    if (!formData.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      return 'Please enter a valid email address';
    }
    if (!formData.company.trim()) return 'Company name is required';
    if (formData.rating < 1 || formData.rating > 5) return 'Please select a rating between 1-5 stars';
    if (!formData.review.trim()) return 'Review text is required';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setSubmissionStatus({ success: false, message: validationError });
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/reviews', formData);
      
      setSubmissionStatus({ 
        success: true, 
        message: 'Review submitted successfully! Thank you for your feedback.' 
      });

      // Reset form
      setFormData({
        name: '',
        company: '',
        rating: 0,
        review: '',
        email: ''
      });
      setHoverRating(0);

    } catch (error) {
      const errorMessage = error.response?.data?.error || 
        'There was an error submitting your review. Please try again later.';
      setSubmissionStatus({ 
        success: false, 
        message: errorMessage 
      });
    }
  };

  return (
    <div className="review-form-container">
      <Navbar></Navbar>
      <h2>Share Your Experience</h2>
      <p className="form-intro-text">
        We value your honest feedback about our products and services. 
        Your review helps us improve and serve you better.
      </p>

      {submissionStatus && (
        <div className={`submission-message ${submissionStatus.success ? 'success' : 'error'}`}>
          <span>{submissionStatus.message}</span>
          <button 
            className="close-button"
            onClick={() => setSubmissionStatus(null)}
            aria-label="Close message"
          >
            <FaTimes />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="review-form">
        <div className="form-group">
          <label htmlFor="name">
            <FaUser className="input-icon" /> Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">
            <FaUser className="input-icon" /> Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@company.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="company">
            <FaBuilding className="input-icon" /> Company Name
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Your company/organization"
            required
          />
        </div>

        <div className="form-group rating-group">
          <label>Your Rating</label>
          <div className="star-rating">
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <label key={index} title={`${ratingValue} star${ratingValue > 1 ? 's' : ''}`}>
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() => handleRatingChange(ratingValue)}
                    className="visually-hidden"
                  />
                  <FaStar
                    className="star"
                    color={ratingValue <= (hoverRating || formData.rating) ? '#ffc107' : '#e4e5e9'}
                    size={32}
                    onMouseEnter={() => setHoverRating(ratingValue)}
                    onMouseLeave={() => setHoverRating(0)}
                    aria-label={`Rate ${ratingValue} out of 5`}
                  />
                </label>
              );
            })}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="review">Detailed Review</label>
          <textarea
            id="review"
            name="review"
            value={formData.review}
            onChange={handleChange}
            rows="6"
            placeholder="Share your detailed experience with us..."
            required
          />
        </div>

        <button 
          type="submit" 
          className="submit-button"
          aria-label="Submit review"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;