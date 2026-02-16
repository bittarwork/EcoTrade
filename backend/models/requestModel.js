const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    scrapType: {
        type: String,
        required: true,
        trim: true,
    },
    images: [{
        type: String,
        required: true,
    }],
    position: {
        type: {
            lat: { type: Number, required: true },
            lng: { type: Number, required: true },
        },
        required: false,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'canceled'],
        default: 'pending',
    },
    notes: {
        type: String,
        trim: true,
        maxlength: 500,
    },
    completedAt: {
        type: Date,
    },
    canceledAt: {
        type: Date,
    },
    canceledBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    completedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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

// Update updatedAt before saving
requestSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Update updatedAt before updating
requestSchema.pre('findOneAndUpdate', function(next) {
    this.set({ updatedAt: Date.now() });
    next();
});

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;
