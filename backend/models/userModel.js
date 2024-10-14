const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user', // جميع المستخدمين الجدد هم من النوع العادي بشكل افتراضي
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    profileImage: { // إضافة حقل صورة الملف الشخصي
        type: String,
        default: null, // القيمة الافتراضية للحقل
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
