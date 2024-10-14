const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const requestRoutes = require('./routes/requestRoutes');
const messageRoutes = require('./routes/messageRoutes');
const dotenv = require('dotenv');
const connectDB = require('./config/db.config');
const path = require('path');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// إعدادات CORS
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Middleware لتحليل بيانات JSON وملفات ثابتة
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// الاتصال بقاعدة البيانات
connectDB();

// إعداد مسارات المستخدم
app.use('/api/users', userRoutes);

// إعداد مسارات الطلبات
app.use('/api/requests', requestRoutes);

// إعداد مسارات الرسائل
app.use('/api/messages', messageRoutes);
// بدء تشغيل السيرفر
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
