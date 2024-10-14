const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    startPrice: {
        type: Number,
        required: true,
    },
    currentBid: {
        type: Number,
        default: 0,
    },
    currentBidder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    endDate: {
        type: Date,
        required: true,
    },
    images: [{
        type: String, // روابط الصور
        required: true,
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Auction = mongoose.model('Auction', auctionSchema);
module.exports = Auction;
