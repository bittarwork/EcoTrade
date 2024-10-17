
const cron = require('node-cron');
const Auction = require('../models/auctionModel');

cron.schedule('* * * * * *', async () => {
    const now = new Date();
    await Auction.updateMany(
        { endDate: { $lt: now }, status: 'open' },
        { status: 'closed' }
    );
});

module.exports = cron; 
