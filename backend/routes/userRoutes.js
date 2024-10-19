const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, checkRole } = require('../middleware/authMiddleware'); // تأكد من مسار الملف الصحيح

router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

router.get('/profile/:userId', userController.getUser);

router.put('/profile/:userId', verifyToken, userController.updateUser);

router.delete('/profile/:userId', verifyToken, checkRole(['admin']), userController.deleteUser);

router.get('/users', verifyToken, checkRole(['admin']), userController.getAllUsers);

module.exports = router;
