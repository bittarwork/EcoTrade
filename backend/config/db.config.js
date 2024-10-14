const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // تحميل المتغيرات من .env

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Could not connect to MongoDB:', error);
        process.exit(1); // إنهاء العملية في حالة فشل الاتصال
    }
};

module.exports = connectDB;
