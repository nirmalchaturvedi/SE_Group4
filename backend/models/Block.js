const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    image: { type: String, required: true },
    offer: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Block', blockSchema);
