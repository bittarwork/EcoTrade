const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, checkRole } = require('../middleware/authMiddleware'); // تأكد من مسار الملف الصحيح

router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

router.get('/profile/:userId', userController.getUser);

router.put('/profile/:userId', userController.updateUser);

router.delete('/profile/:userId', userController.deleteUser);

router.get('/users', userController.getAllUsers);

module.exports = router;
