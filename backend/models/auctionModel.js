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
        enum: [
            'Metals',
            'Plastics',
            'Electronics',
            'Paper and Cardboard',
            'Furniture'
        ],
        required: true,
    },
    condition: {
        type: String,
        enum: ['Repairable', 'Used - Good Condition', 'Used - Fair Condition', 'Not Usable'],
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
    bids: [{
        bidder: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        bidAmount: {
            type: Number,
            required: true,
        },
        bidTime: {
            type: Date,
            default: Date.now,
        },
    }],
    autoBid: {
        type: Boolean,
        default: false,
    },
    maxAutoBidAmount: {
        type: Number,
        default: 0,
    },
    minBidIncrement: {
        type: Number,
        required: true,
        default: 1,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
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
