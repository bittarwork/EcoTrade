const mongoose = require('mongoose');

const scrapItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: {
        type: String,
        enum: ['Metals', 'Plastics', 'Electronics', 'Paper and Cardboard', 'Furniture'],
        required: true
    },
    quantity: { type: Number, required: true },
    userRequestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Request', default: null },
    status: { type: String, enum: ['Received', 'Processed', 'Ready for Recycling', 'Ready for Auction'], default: 'Received' },
    barcode: { type: String, unique: true },
    estimatedPrice: { type: Number, required: true },
    source: { type: String, enum: ['User Request', 'Admin Manual Entry'], required: true },
    images: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const ScrapItem = mongoose.model('ScrapItem', scrapItemSchema);

module.exports = ScrapItem;
