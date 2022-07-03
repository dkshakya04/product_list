const mongoose = require('mongoose');

const FavouriteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    productId: {
        type: mongoose.Types.ObjectId,
        ref: 'products'
    }
});

module.exports = mongoose.model('favourites', FavouriteSchema);