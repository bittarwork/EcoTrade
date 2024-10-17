const express = require('express');
const {
    createAuction,
    getAllAuctions,
    placeBid,
    getAuctionDetails,
    closeAuction,
    deleteAuction,
    getCurrentBids,
    updateBid,
    getTopBidders,
    cancelAuction
} = require('../controllers/auctionController');
const upload = require('../config/multerConfig');

const router = express.Router();

// إضافة مسار لإنشاء مزاد جديد
router.post('/', upload.array('images', 10), createAuction);

// نقطة نهائية لاسترجاع جميع المزادات
router.get('/', getAllAuctions);

// نقطة نهائية لاسترجاع تفاصيل مزاد محدد
router.get('/:auctionId', getAuctionDetails);

// نقطة نهائية لإغلاق مزاد معين
router.put('/close/:auctionId', closeAuction);

// نقطة النهاية لإلغاء مزاد معين
router.put('/cancel/:auctionId', cancelAuction);

// نقطة نهائية لحذف مزاد معين
router.delete('/:auctionId', deleteAuction);


// نقطة نهائية لتحديث عرض المزايدة الحالي
router.put('/bid', updateBid);



module.exports = router;
