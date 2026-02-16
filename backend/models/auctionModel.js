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
    images: [String], // Array of image URLs
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
    status: {
        type: String,
        enum: ['open', 'closed', 'canceled'],
        default: 'open',
    },
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    viewsCount: {
        type: Number,
        default: 0,
    },
    participantsCount: {
        type: Number,
        default: 0,
    },
    quantity: {
        type: String,
        default: '',
    },
    location: {
        type: String,
        default: '',
    },
    condition: {
        type: String,
        enum: ['Excellent', 'Good', 'Fair', 'Poor'],
        default: 'Good',
    },
    weight: {
        type: String,
        default: '',
    },
    specifications: {
        type: String,
        default: '',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Update timestamp on save
auctionSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Virtual for calculating time remaining
auctionSchema.virtual('timeRemaining').get(function() {
    const now = new Date();
    const end = new Date(this.endDate);
    return Math.max(0, end - now);
});

// Virtual for checking if auction is expired
auctionSchema.virtual('isExpired').get(function() {
    return new Date() > new Date(this.endDate);
});

const Auction = mongoose.model('Auction', auctionSchema);
module.exports = Auction;
