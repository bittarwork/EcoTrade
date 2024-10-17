const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, checkRole } = require('../middleware/authMiddleware'); // تأكد من مسار الملف الصحيح

// مسار تسجيل مستخدم جديد
// http://localhost:5000/api/users/register
// name , email , password, profileImage : form- data 
// response :
// {
//     "message": "تم تسجيل المستخدم بنجاح",
//         "user": {
//         "id": "670d1e9b900cb18e73cc02df",
//             "name": "osama bittar",
//                 "email": "ahazxadasxcasssmasded23@gmail.com",
//                     "profileImage": "uploads\\profileImage-1728913051264-861542838.webp",
//                         "createdAt": "2024-10-14T13:37:31.333Z",
//                             "role": "user"
//     }
// }
router.post('/register', userController.registerUser);

// مسار تسجيل الدخول
// http://localhost:5000/api/users/login
// {
//     "email": "ahazxadasxcasssmasded23@gmail.com",
//         "password": "password123"
// }
// response : 
// {
//     "message": "تم تسجيل الدخول بنجاح",
//         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MGQxZTliOTAwY2IxOGU3M2NjMDJkZiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzI4OTEzMDk1LCJleHAiOjE3Mjg5MTY2OTV9.UAcvymQ6c2RmXyazjF6zzXUSMnWY1mVuewaScfbqpqU",
//             "user": {
//         "id": "670d1e9b900cb18e73cc02df",
//             "name": "osama bittar",
//                 "email": "ahazxadasxcasssmasded23@gmail.com",
//                     "profileImage": "http://localhost:5000/uploads\\profileImage-1728913051264-861542838.webp",
//                         "createdAt": "2024-10-14T13:37:31.333Z",
//                             "role": "user"
//     }
// }
router.post('/login', userController.loginUser);

// http://localhost:5000/api/users/profile/670d198df86a59a21fde12db
// header: Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
// response : 
// {
//     "user": {
//         "id": "670d198df86a59a21fde12db",
//             "name": "oasssssssssssdf",
//                 "email": "ahaadasxcasssmasded23@gmail.com",
//                     "profileImage": "uploads\\profileImage-1728911756899-782519227.png",
//                         "createdAt": "2024-10-14T13:15:57.033Z",
//                             "role": "user"
//     }
// }
router.get('/profile/:userId', userController.getUser);

// مسار تحديث معلومات المستخدم
// مسار الحصول على معلومات المستخدم
// http://localhost:5000/api/users/profile/670d1e9b900cb18e73cc02df
// new information : .... 
// header: Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
// response:
// {
//     "message": "تم تحديث معلومات المستخدم بنجاح",
//         "user": {
//         "id": "670d1e9b900cb18e73cc02df",
//             "name": "oasssssssssssdf",
//                 "email": "ahazxadasxcasssmasded23@gmail.com",
//                     "profileImage": "uploads\\profileImage-1728913051264-861542838.webp",
//                         "createdAt": "2024-10-14T13:37:31.333Z"
//     }
// }
router.put('/profile/:userId', verifyToken, userController.updateUser);

// مسار حذف مستخدم
// only for admin that can use it
// http://localhost:5000/api/users/profile/670d210ec447140700d4274e
// header: Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
// response : 
// {
//     "message": "تم حذف المستخدم بنجاح"
// }
router.delete('/profile/:userId', verifyToken, checkRole(['admin']), userController.deleteUser);

module.exports = router;
