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
// key: itemName
// value: (اسم العنصر، على سبيل المثال: Old Furniture)
// key: description
// value: (وصف العنصر، على سبيل المثال: A piece of old furniture in good condition.)
// key: category
// value: (اختر فئة، على سبيل المثال: Furniture)
// key: startPrice
// value: (سعر البداية، على سبيل المثال: 5000)
// key: endDate
// value: (تاريخ انتهاء المزاد بتنسيق ISO، على سبيل المثال: 2024 - 12 - 31T23: 59: 59Z)
// key: images
// value: (قم بتحميل صورة من جهازك.)
// response : 
// {
//     "itemName": "كرسي خشبي",
//         "description": "كرسي قديم في حالة جيدة",
//             "category": "Furniture",
//                 "startPrice": 100,
//                     "currentBid": 0,
//                         "endDate": "2024-12-31T23:59:59.000Z",
//                             "images": [
//                                 "http://localhost:5000/uploads\\images-1729046741043-293080916.jpg",
//                                 "http://localhost:5000/uploads\\images-1729046741045-516222271.jpg",
//                                 "http://localhost:5000/uploads\\images-1729046741046-146472802.jpg",
//                                 "http://localhost:5000/uploads\\images-1729046741051-920074021.jpg",
//                                 "http://localhost:5000/uploads\\images-1729046741055-471817698.jpg",
//                                 "http://localhost:5000/uploads\\images-1729046741062-944314168.jpg",
//                                 "http://localhost:5000/uploads\\images-1729046741067-20019835.jpg",
//                                 "http://localhost:5000/uploads\\images-1729046741071-357284151.jpg"
//                             ],
//                                 "status": "open",
//                                     "_id": "670f28d55e9c9103d1b1fc20",
//                                         "bids": [],
//                                             "createdAt": "2024-10-16T02:45:41.076Z",
//                                                 "__v": 0
// }
router.post('/', upload.array('images', 10), createAuction);

// نقطة نهائية لاسترجاع جميع المزادات
// response :
// [
//     {
//         "_id": "670f27060ccd5474ac0187ff",
//         "itemName": "كرسي خشبي",
//         "description": "كرسي قديم في حالة جيدة",
//         "category": "Furniture",
//         "startPrice": 100,
//         "currentBid": 0,
//         "endDate": "2024-12-31T23:59:59.000Z",
//         "images": [
//             "http://localhost:5000/uploads\\images-1729046278423-49309638.jpg",
//             "http://localhost:5000/uploads\\images-1729046278427-47831297.jpg",
//             "http://localhost:5000/uploads\\images-1729046278428-793259835.jpeg",
//             "http://localhost:5000/uploads\\images-1729046278428-748830494.jpg"
//         ],
//         "status": "canceled",
//         "bids": [],
//         "createdAt": "2024-10-16T02:37:58.439Z",
//         "__v": 0
//     },
//     {
router.get('/', getAllAuctions);

// نقطة نهائية لاسترجاع تفاصيل مزاد محدد
// response :
// {
//     "_id": "670f27060ccd5474ac0187ff",
//         "itemName": "كرسي خشبي",
//             "description": "كرسي قديم في حالة جيدة",
//                 "category": "Furniture",
//                     "startPrice": 100,
//                         "currentBid": 0,
//                             "endDate": "2024-12-31T23:59:59.000Z",
//                                 "images": [
//                                     "http://localhost:5000/uploads\\images-1729046278423-49309638.jpg",
//                                     "http://localhost:5000/uploads\\images-1729046278427-47831297.jpg",
//                                     "http://localhost:5000/uploads\\images-1729046278428-793259835.jpeg",
//                                     "http://localhost:5000/uploads\\images-1729046278428-748830494.jpg"
//                                 ],
//                                     "status": "canceled",
//                                         "bids": [],
//                                             "createdAt": "2024-10-16T02:37:58.439Z",
//                                                 "__v": 0
// }
router.get('/:auctionId', getAuctionDetails);

// نقطة نهائية لإغلاق مزاد معين
// http://localhost:5000/api/auction/cancel/670f27060ccd5474ac0187ff
router.put('/close/:auctionId', closeAuction);

// نقطة النهاية لإلغاء مزاد معين
// same as last one 
router.put('/cancel/:auctionId', cancelAuction);

// نقطة نهائية لحذف مزاد معين
// response :
// {
//     "message": "تم حذف المزاد بنجاح."
// }
router.delete('/:auctionId', deleteAuction);


// // نقطة نهائية لتحديث عرض المزايدة الحالي
// router.put('/update-bid', updateBid);

// // نقطة نهائية لاسترجاع أعلى المزايدين لمزاد معين
// router.get('/top-bidders/:auctionId', getTopBidders);

// // نقطة نهائية لتقديم عرض على مزاد معين
// router.post('/bid', placeBid);

// // نقطة نهائية لاسترجاع جميع العروض الحالية لمزاد معين
// router.get('/current-bids/:auctionId', getCurrentBids);

module.exports = router;
