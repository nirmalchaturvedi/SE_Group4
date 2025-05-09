const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  review: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', ReviewSchema);