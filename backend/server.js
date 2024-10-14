const express = require('express');
const cors = require('cors'); // استيراد مكتبة CORS
const userRoutes = require('./routes/userRoutes');
const dotenv = require('dotenv');
const connectDB = require('./config/db.config'); // استيراد وظيفة الاتصال بقاعدة البيانات

dotenv.config(); // تحميل المتغيرات من .env

const app = express();
const PORT = process.env.PORT || 5000;

// إعدادات Middleware
app.use(cors({
    origin: 'http://localhost:3000', // السماح بالوصول من هذا الأصل فقط
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // السماح بالطرق التي تريدها
    credentials: true // إذا كنت بحاجة إلى إرسال ملفات تعريف الارتباط
}));

app.use(express.json()); // لتحليل JSON في الطلبات

// اتصال بقاعدة البيانات
connectDB(); // الاتصال بقاعدة البيانات

// إعداد المسارات
app.use('/api/users', userRoutes);

// بدء السيرفر
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
