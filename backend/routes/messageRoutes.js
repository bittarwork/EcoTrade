// routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// نقطة نهاية لاستلام الرسائل
router.post('/send-message', async (req, res) => {
    const { customerName, email, message } = req.body;

    try {
        // إنشاء رسالة جديدة
        const newMessage = new Message({ customerName, email, message });
        await newMessage.save();

        res.status(201).json({ message: 'تم تخزين الرسالة بنجاح!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'حدث خطأ، يرجى المحاولة لاحقًا.' });
    }
});

// نقطة نهاية لاسترجاع الرسائل
router.get('/', async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'حدث خطأ، يرجى المحاولة لاحقًا.' });
    }
});

module.exports = router;
