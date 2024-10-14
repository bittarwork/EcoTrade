const Request = require('../models/requestModel');
const User = require('../models/userModel');
const upload = require('../config/multerConfig'); // استيراد إعدادات Multer
// إنشاء طلب جديد مع صور
exports.createRequest = [
    upload.array('images', 5), // السماح بتحميل حتى 5 صور لكل طلب
    async (req, res) => {
        const { userId, address, scrapType } = req.body;

        // التحقق مما إذا كانت الملفات قد تم تحميلها
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'يجب تحميل صورة واحدة على الأقل' });
        }

        // تكوين روابط الصور باستخدام URL الكامل
        const images = req.files.map(file => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`);

        try {
            const newRequest = new Request({
                userId,
                address,
                scrapType,
                images,
            });
            await newRequest.save();
            res.status(201).json({
                message: 'طلب جديد تم إنشاؤه بنجاح',
                request: {
                    _id: newRequest._id,
                    userId,
                    address,
                    scrapType,
                    images,
                    status: newRequest.status,
                    createdAt: newRequest.createdAt,
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'فشل في إنشاء الطلب', error: error.message });
        }
    }
];


// استرجاع جميع الطلبات المقدمة من قبل المستخدم الحالي
// استرجاع جميع الطلبات المقدمة من قبل مستخدم معين بناءً على ID المستخدم
exports.getUserRequests = async (req, res) => {
    const userId = req.params.id; // الحصول على ID المستخدم من المعاملات

    try {
        // استرجاع جميع الطلبات المتعلقة بالمستخدم
        const requests = await Request.find({ userId }).populate('userId', 'name email');

        // تنسيق الطلبات للرد
        const formattedRequests = requests.map(request => ({
            _id: request._id,
            address: request.address,
            scrapType: request.scrapType,
            images: request.images.map(image => `${req.protocol}://${req.get('host')}/${image}`),
            status: request.status,
            createdAt: request.createdAt,
        }));

        // إرسال الطلبات للمستخدم
        res.status(200).json(formattedRequests);
    } catch (error) {
        res.status(500).json({ message: 'فشل في استرجاع الطلبات', error: error.message });
    }
};



// تحديث حالة الطلب
exports.updateRequestStatus = async (req, res) => {
    const { requestId, status } = req.body;

    if (!['completed', 'canceled'].includes(status)) {
        return res.status(400).json({ message: 'الحالة غير صالحة' });
    }

    try {
        const updatedRequest = await Request.findByIdAndUpdate(requestId, { status }, { new: true });
        if (!updatedRequest) {
            return res.status(404).json({ message: 'الطلب غير موجود' });
        }

        res.status(200).json({
            message: 'تم تحديث حالة الطلب بنجاح',
            request: {
                _id: updatedRequest._id,
                address: updatedRequest.address,
                scrapType: updatedRequest.scrapType,
                images: updatedRequest.images.map(image => `${req.protocol}://${req.get('host')}/${image}`),
                status: updatedRequest.status,
                createdAt: updatedRequest.createdAt,
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'فشل في تحديث حالة الطلب', error: error.message });
    }
};

// استرجاع جميع الطلبات في النظام مجمعة حسب المستخدم
exports.getAllRequests = async (req, res) => {
    try {
        const requests = await Request.aggregate([
            {
                $lookup: {
                    from: 'users', // تأكد من أن اسم مجموعة المستخدمين هو 'users'
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userInfo'
                }
            },
            {
                $unwind: '$userInfo' // فك تجميع البيانات حسب المستخدم
            },
            {
                $group: {
                    _id: '$userId', // تجميع الطلبات حسب userId
                    requests: {
                        $push: {
                            _id: '$_id',
                            address: '$address',
                            scrapType: '$scrapType',
                            images: '$images',
                            status: '$status',
                            createdAt: '$createdAt',
                            userName: { $first: '$userInfo.name' }, // جلب اسم المستخدم
                            userEmail: { $first: '$userInfo.email' } // جلب البريد الإلكتروني للمستخدم
                        }
                    },
                }
            },
            {
                $project: {
                    _id: 0,
                    userId: '$_id',
                    requests: 1,
                }
            }
        ]);

        // إرسال الطلبات للمستخدم
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: 'فشل في استرجاع الطلبات', error: error.message });
    }
};

