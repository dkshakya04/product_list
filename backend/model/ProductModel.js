const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    imgUrl: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('products', ProductSchema);