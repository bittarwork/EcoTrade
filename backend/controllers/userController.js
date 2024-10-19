const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const upload = require('../config/multerConfig'); // استيراد إعدادات Multer
const { validationResult } = require('express-validator');


// تحميل صورة واحدة
exports.uploadImage = upload.single('profileImage');

exports.registerUser = [
    exports.uploadImage,
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { name, email, password } = req.body;
            const profileImage = req.file ? req.file.path : null;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'البريد الإلكتروني موجود بالفعل. يرجى استخدام بيانات مختلفة.' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                name,
                email,
                password: hashedPassword,
                profileImage
            });

            await newUser.save();
            const responseUser = {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                profileImage: newUser.profileImage,
                createdAt: newUser.createdAt,
                role: newUser.role
            };

            res.status(201).json({ message: 'تم تسجيل المستخدم بنجاح', user: responseUser });
        } catch (error) {
            res.status(500).json({ message: 'خطأ في التسجيل', error: error.message });
        }
    }
];
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, 'name email profileImage createdAt role');

        if (!users) {
            return res.status(404).json({ message: 'لا يوجد مستخدمين مسجلين' });
        }

        const formattedUsers = users.map(user => ({
            id: user._id,
            name: user.name,
            email: user.email,
            profileImage: user.profileImage,
            createdAt: user.createdAt,
            role: user.role,
        }));

        res.status(200).json({ message: 'تم استرجاع جميع المستخدمين بنجاح', users: formattedUsers });
    } catch (error) {
        res.status(500).json({ message: 'خطأ في استرجاع المستخدمين', error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'بيانات الاعتماد غير صحيحة' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'بيانات الاعتماد غير صحيحة' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const imageUrl = user.profileImage ? `${req.protocol}://${req.get('host')}/${user.profileImage}` : null;

        res.json({
            message: 'تم تسجيل الدخول بنجاح',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                profileImage: imageUrl,
                createdAt: user.createdAt,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateUser = [
    upload.single('profileImage'),
    async (req, res) => {
        try {
            const { userId } = req.params;
            const { name, email, password } = req.body;

            const updatedData = {
                name,
                email,
                profileImage: req.file ? req.file.path : undefined
            };

            if (password) {
                updatedData.password = await bcrypt.hash(password, 10);
            }

            const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });


            if (!updatedUser) {
                return res.status(404).json({ message: 'المستخدم غير موجود' });
            }

            res.json({
                message: 'تم تحديث معلومات المستخدم بنجاح',
                user: {
                    id: updatedUser._id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    profileImage: updatedUser.profileImage,
                    createdAt: updatedUser.createdAt,
                    updatedAt: updatedUser.updatedAt
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
];

exports.getUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'المستخدم غير موجود' });
        }

        const serverUrl = `${req.protocol}://${req.get('host')}/`;

        res.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                profileImage: serverUrl + user.profileImage,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'المستخدم غير موجود' });
        }

        res.json({ message: 'تم حذف المستخدم بنجاح' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
