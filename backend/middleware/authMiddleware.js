const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // تأكد من أن المسار صحيح

// دالة للتحقق من الـ JWT
exports.verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // استخراج التوكن من الهيدر

    if (!token) {
        return res.status(401).json({ message: 'لا يوجد توكن. الوصول غير مصرح.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // تحقق من التوكن باستخدام السر
        req.user = decoded; // إضافة بيانات المستخدم إلى الطلب بعد فك التوكن
        next();
    } catch (error) {
        res.status(401).json({ message: 'توكن غير صالح أو منتهي الصلاحية.' });
    }
};

// دالة للتحقق من صلاحية الدور
exports.checkRole = (roles) => {
    return async (req, res, next) => {
        try {
            const user = await User.findById(req.user.id); // استرجاع المستخدم بناءً على الـ JWT

            if (!user) {
                return res.status(404).json({ message: 'المستخدم غير موجود.' });
            }

            if (!roles.includes(user.role)) {
                return res.status(403).json({ message: 'ليس لديك صلاحية للوصول إلى هذا المورد.' });
            }

            next();
        } catch (error) {
            res.status(500).json({ message: 'خطأ في التحقق من الدور.', error: error.message });
        }
    };
};
