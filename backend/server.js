const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// استيراد الوظائف والمكونات الأخرى
const connectDB = require('./config/db.config');
const userRoutes = require('./routes/userRoutes');
const requestRoutes = require('./routes/requestRoutes');
const messageRoutes = require('./routes/messageRoutes');
const auctionRoutes = require('./routes/auctionRoutes');
const scrapItems = require('./routes/scrapItemsRoutes');
require('./scheduled/cronJobs'); // استيراد وظائف الجدولة إذا كانت ضرورية

// تحميل متغيرات البيئة من ملف .env
dotenv.config();

// إعداد التطبيق
const app = express();
const PORT = process.env.PORT || 5000;

// إعداد CORS
app.use(cors({
    origin: 'http://localhost:3000', // تأكد من تحديثه حسب الحاجة
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// إعداد المكونات الوسيطة
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// الاتصال بقاعدة البيانات
connectDB();

// إعداد المسارات
app.use('/api/users', userRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/auction', auctionRoutes);
app.use('/api/scrap', scrapItems);

// بدء الخادم
app.listen(PORT, () => {
    console.log(`✅  Server is running on http://localhost:${PORT}`);
});
