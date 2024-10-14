const jwt = require('jsonwebtoken');

// ميدل وير للتحقق من صحة التوكن
exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // استخراج التوكن من الهيدر

    if (!token) {
        return res.status(403).json({ message: 'ليس لديك إذن للوصول' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'التوكن غير صالح أو منتهي' });
        }
        // إضافة المعلومات المستخرجة من التوكن إلى الطلب
        req.user = {
            id: decoded.id,
            role: decoded.role
        };
        next();
    });
};

// ميدل وير للتحقق من الأدوار
exports.checkRole = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'ليس لديك إذن للوصول إلى هذه الموارد' });
    }
    next();
};
