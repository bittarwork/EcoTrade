const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const upload = require('../config/multerConfig'); // استيراد إعدادات Multer
const { validationResult } = require('express-validator');


// تحميل صورة واحدة
exports.uploadImage = upload.single('profileImage');

// دالة تسجيل المستخدم
exports.registerUser = [
    // استخدام Multer لرفع صورة الملف
    exports.uploadImage,
    async (req, res) => {
        try {
            // تحقق من الأخطاء في البيانات المدخلة
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // تأكد من أن جميع الحقول المطلوبة موجودة في الطلب
            const { name, email, password } = req.body;
            const profileImage = req.file ? req.file.path : null; // الحصول على مسار الصورة

            // تحقق من وجود المستخدم باستخدام البريد الإلكتروني
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'البريد الإلكتروني موجود بالفعل. يرجى استخدام بيانات مختلفة.' });
            }

            // تشفير كلمة المرور
            const hashedPassword = await bcrypt.hash(password, 10);

            // إنشاء مستخدم جديد
            const newUser = new User({
                name,
                email,
                password: hashedPassword,
                profileImage // إضافة مسار الصورة
            });

            await newUser.save();

            // إعداد الاستجابة مع تفاصيل المستخدم
            const responseUser = {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                profileImage: newUser.profileImage,
                createdAt: newUser.createdAt,
                role: newUser.role // إضافة الدور الخاص بالمستخدم
            };

            res.status(201).json({ message: 'تم تسجيل المستخدم بنجاح', user: responseUser });
        } catch (error) {
            res.status(500).json({ message: 'خطأ في التسجيل', error: error.message });
        }
    }
];



// دالة تسجيل الدخول
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body; // تأكد من أنك تستخدم req.body
        const user = await User.findOne({ email });

        // التحقق من وجود المستخدم
        if (!user) {
            return res.status(401).json({ message: 'بيانات الاعتماد غير صحيحة' });
        }

        // التحقق من كلمة المرور
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'بيانات الاعتماد غير صحيحة' });
        }

        // توليد رمز التوثيق
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // بناء مسار الصورة بشكل صحيح
        const imageUrl = user.profileImage ? `${req.protocol}://${req.get('host')}/${user.profileImage}` : null;

        // إرجاع معلومات المستخدم بالتفصيل
        res.json({
            message: 'تم تسجيل الدخول بنجاح',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                profileImage: imageUrl,
                createdAt: user.createdAt,
                role: user.role // إضافة الدور الخاص بالمستخدم
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// دالة تحديث معلومات المستخدم
exports.updateUser = [
    upload.single('profileImage'), // استخدام Multer لرفع صورة الملف
    async (req, res) => {
        try {
            const { userId } = req.params;
            const { name, email, password } = req.body;

            const updatedData = {
                name,
                email,
                profileImage: req.file ? req.file.path : undefined // الحصول على مسار الصورة
            };

            // تحديث كلمة المرور إذا تم توفيرها
            if (password) {
                updatedData.password = await bcrypt.hash(password, 10);
            }

            // تحديث المستخدم
            const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });

            // التحقق من وجود المستخدم
            if (!updatedUser) {
                return res.status(404).json({ message: 'المستخدم غير موجود' });
            }

            res.json({
                message: 'تم تحديث معلومات المستخدم بنجاح',
                user: {
                    id: updatedUser._id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    profileImage: updatedUser.profileImage, // إضافة مسار الصورة
                    createdAt: updatedUser.createdAt,
                    updatedAt: updatedUser.updatedAt
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
];

// دالة الحصول على معلومات المستخدم
exports.getUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);

        // التحقق من وجود المستخدم
        if (!user) {
            return res.status(404).json({ message: 'المستخدم غير موجود' });
        }

        // الحصول على عنوان السيرفر
        const serverUrl = `${req.protocol}://${req.get('host')}/`;

        res.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                profileImage: serverUrl + user.profileImage, // دمج عنوان السيرفر مع مسار الصورة
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                role: user.role // إضافة الدور الخاص بالمستخدم
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// دالة حذف المستخدم
exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const deletedUser = await User.findByIdAndDelete(userId);

        // التحقق من وجود المستخدم
        if (!deletedUser) {
            return res.status(404).json({ message: 'المستخدم غير موجود' });
        }

        res.json({ message: 'تم حذف المستخدم بنجاح' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
