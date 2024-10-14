const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // الحصول على التوكن من الهيدر

    if (!token) {
        return res.status(403).json({ message: 'ليس لديك إذن للوصول' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'التوكن غير صالح أو منتهي' });
        }
        req.userId = decoded.id; // تخزين معرف المستخدم في الطلب
        req.role = decoded.role; // تخزين الدور في الطلب
        next(); // الانتقال إلى الدالة التالية
    });
};

// ميدل وير للتحقق من الأدوار
exports.checkRole = (roles) => (req, res, next) => {
    if (!roles.includes(req.role)) {
        return res.status(403).json({ message: 'ليس لديك إذن للوصول إلى هذه الموارد' });
    }
    next(); // الانتقال إلى الدالة التالية
};
