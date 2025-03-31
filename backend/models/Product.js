const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    image: { type: String, required: true },
    offer: { type: Boolean, default: false }, // Add offer field
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
