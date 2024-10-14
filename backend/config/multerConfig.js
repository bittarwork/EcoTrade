const multer = require('multer');
const path = require('path');

// إعداد Multer لتخزين الملفات المرفوعة
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // مجلد حفظ الصور
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);
    }
});

// إعداد خيارات Multer
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // التحقق من نوع الملف
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('الملف يجب أن يكون صورة'));
        }
    },
    limits: { fileSize: 1024 * 1024 * 2 } // الحد الأقصى لحجم الصورة 2MB
});

// تصدير دالة الرفع
module.exports = upload; // قم بتصدير `upload` مباشرة
