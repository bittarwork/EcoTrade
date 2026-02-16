const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const { verifyToken, checkRole } = require('../middleware/authMiddleware');

// Create new request - requires authentication
router.post(
    '/create',
    verifyToken,
    requestController.createRequest
);

// Get requests grouped by user - admin only
router.get(
    '/grouped',
    verifyToken,
    checkRole(['admin']),
    requestController.getRequestsGroupedByUser
);

// Get user requests - requires authentication
router.get(
    '/:id',
    verifyToken,
    requestController.getUserRequests
);

// Update request status - admin only
router.put(
    '/update-status',
    verifyToken,
    checkRole(['admin']),
    requestController.updateRequestStatus
);

// Delete request - admin only
router.delete(
    '/:id',
    verifyToken,
    checkRole(['admin']),
    requestController.deleteRequestById
);

module.exports = router;
// 1. إنشاء طلب جديد(/api/requests)
// الطريقة: POST
// الرابط: http://localhost:5000/api/requests
// الطلب:
// Headers:
// Content - Type: multipart / form - data
// Authorization: Bearer YOUR_JWT_TOKEN(استبدل YOUR_JWT_TOKEN بالتوكن الخاص بك)
// Body:
// اختر form - data
// أضف الحقول التالية:
// userId: ID المستخدم(نوع نص)
// address: عنوان الطلب(نوع نص)
// scrapType: نوع الخردة(نوع نص)
// images: أضف صورًا(نوع ملف، يمكنك إضافة أكثر من ملف)
// response :
// {
//     "message": "طلب جديد تم إنشاؤه بنجاح",
//         "request": {
//         "_id": "670d4b6b08341966c06f3e62",
//             "userId": "670d38e2b64873138fc32835",
//                 "address": "شسسسسس",
//                     "scrapType": "شس",
//                         "images": [
//                             "http://localhost:5000/uploads/images-1728924523440-728728707.PNG",
//                             "http://localhost:5000/uploads/images-1728924523441-786307313.PNG",
//                             "http://localhost:5000/uploads/images-1728924523442-277377153.PNG",
//                             "http://localhost:5000/uploads/images-1728924523442-99493574.PNG",
//                             "http://localhost:5000/uploads/images-1728924523443-942367874.PNG"
//                         ],
//                             "status": "pending",
//                                 "createdAt": "2024-10-14T16:48:43.448Z"
//     }
// }

// الحصول على كل الطلبات الموافقة لمستخدم معين :
// http://localhost:5000/api/requests/670d38e2b64873138fc32835
// response :
// [
//     {
//         "_id": "670d4b5708341966c06f3e60",
//         "address": "شسسسسس",
//         "scrapType": "شس",
//         "images": [
//             "http://localhost:5000/http://localhost:5000/uploads/images-1728924503729-635212772.PNG"
//         ],
//         "status": "pending",
//         "createdAt": "2024-10-14T16:48:23.737Z"
//     },
//     {


// تحديث حالة الطلب (يتطلب مصادقة + صلاحية المسؤول)
// http://localhost:5000/api/requests/update-status
// {
// "requestId": "670d4b5708341966c06f3e60",
//     "status": "completed"
// }
// response :
// {
//     "message": "تم تحديث حالة الطلب بنجاح",
//         "request": {
//         "_id": "670d4b5708341966c06f3e60",
//             "address": "شسسسسس",
//                 "scrapType": "شس",
//                     "images": [
//                         "http://localhost:5000/http://localhost:5000/uploads/images-1728924503729-635212772.PNG"
//                     ],
//                         "status": "completed",
//                             "createdAt": "2024-10-14T16:48:23.737Z"
//     }
// }