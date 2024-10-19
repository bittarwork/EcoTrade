const cron = require('node-cron');
const Auction = require('../models/auctionModel');
const Request = require('../models/requestModel');
const ScrapItem = require('../models/scrapItem');

// مهمة مجدولة لإغلاق المزادات التي انتهت صلاحيتها
cron.schedule('* * * * * *', async () => {
    const now = new Date();
    await Auction.updateMany(
        { endDate: { $lt: now }, status: 'open' },
        { status: 'closed' }
    );
});

// مهمة مجدولة لتحويل الطلبات المكتملة إلى مواد
cron.schedule('* * * * * *', async () => {
    try {

        const completedRequests = await Request.find({ status: 'completed' });

        for (let request of completedRequests) {
            const existingScrapItem = await ScrapItem.findOne({ userRequestId: request._id });
            if (existingScrapItem) {
                continue;
            }

            const defaultCategory = 'Metals';
            const defaultDescription = `Item includes: ${request.scrapType || 'Description not provided'}`;
            const defaultQuantity = 1;
            const defaultBarcode = `BARCODE-${request._id}-${Date.now()}`;

            const newScrapItem = new ScrapItem({
                name: request.scrapType || 'Unnamed Item',
                description: defaultDescription,
                category: defaultCategory,
                quantity: defaultQuantity,
                userRequestId: request._id,
                estimatedPrice: 0,
                barcode: defaultBarcode,
                source: 'User Request',
                images: request.images || [],
                status: 'Received',
            });

            await newScrapItem.save();
        }

    } catch (error) {
        console.error(`Error processing completed requests: ${error.message}`);
    }
});

module.exports = cron;
