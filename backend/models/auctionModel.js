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
    category: {
        type: String,
        enum: ['Metals', 'Plastics', 'Electronics', 'Paper and Cardboard', 'Furniture'],
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
    images: [String], // يمكن استخدام نوع String مباشرة
    bids: [{
        bidder: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        bidAmount: {
            type: Number,
            required: true,
        },
    }],
    status: {
        type: String,
        enum: ['open', 'closed', 'canceled'],
        default: 'open',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Auction = mongoose.model('Auction', auctionSchema);
module.exports = Auction;
