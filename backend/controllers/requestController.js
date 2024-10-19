const Request = require('../models/requestModel');
const User = require('../models/userModel');
const upload = require('../config/multerConfig');


const getFullImagePath = (images, req) => {
    return images.map(image => {
        return image.startsWith('uploads/')
            ? `${req.protocol}://${req.get('host')}/${image}`
            : image; // إذا كان الرابط كاملاً، اتركه كما هو
    });
};


// إنشاء طلب جديد
exports.createRequest = [
    upload.array('images', 5),
    async (req, res) => {
        const { userId, address, scrapType } = req.body;

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'يجب تحميل صورة واحدة على الأقل' });
        }

        const images = req.files.map(file => `uploads/${file.filename}`);

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
                    id: newRequest._id,
                    userId,
                    address,
                    scrapType,
                    images: getFullImagePath(images, req), // استدعاء الدالة المساعدة
                    status: newRequest.status,
                    createdAt: newRequest.createdAt,
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'فشل في إنشاء الطلب', error: error.message });
        }
    }
];

// استرجاع الطلبات الخاصة بالمستخدم
exports.getUserRequests = async (req, res) => {
    const userId = req.params.id;

    try {
        const requests = await Request.find({ userId }).populate('userId', 'name email');

        const formattedRequests = requests.map(request => ({
            id: request._id,
            address: request.address,
            scrapType: request.scrapType,
            images: getFullImagePath(request.images, req), // استدعاء الدالة المساعدة
            status: request.status,
            createdAt: request.createdAt,
        }));

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
                id: updatedRequest._id,
                address: updatedRequest.address,
                scrapType: updatedRequest.scrapType,
                images: getFullImagePath(updatedRequest.images, req), // استدعاء الدالة المساعدة
                status: updatedRequest.status,
                createdAt: updatedRequest.createdAt,
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'فشل في تحديث حالة الطلب', error: error.message });
    }
};

exports.getRequestsGroupedByUser = async (req, res) => {
    try {
        const requests = await Request.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userInfo',
                },
            },
            {
                $unwind: '$userInfo',
            },
            {
                $group: {
                    _id: {
                        id: '$userInfo._id',
                        name: '$userInfo.name',
                        email: '$userInfo.email',
                        role: '$userInfo.role',
                        profileImage: '$userInfo.profileImage',
                    },
                    requests: { $push: '$$ROOT' },
                },
            },
            {
                $project: {
                    user: {
                        id: '$_id.id',
                        name: '$_id.name',
                        email: '$_id.email',
                        role: '$_id.role',
                        profileImage: '$_id.profileImage',
                    },
                    requests: 1,
                    _id: 0,
                },
            },
        ]);

        // تحديث رابط الصورة الكاملة لصورة البروفايل
        requests.forEach(request => {
            const profileImage = request.user.profileImage;
            request.user.profileImage = profileImage ? `${req.protocol}://${req.get('host')}/${profileImage.replace(/\\/g, '/')}` : null;

            // تحديث روابط الصور الخاصة بالطلب
            request.requests.forEach(reqItem => { // تغيير اسم المتغير هنا
                reqItem.images = reqItem.images.map(image => {
                    return `${req.protocol}://${req.get('host')}/${image.replace(/\\/g, '/')}`;
                });
            });
        });

        res.status(200).json(requests); // إرسال الطلبات كاستجابة
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'حدث خطأ أثناء جلب الطلبات', error: error.message });
    }
};


// دالة لحذف طلب معين باستخدام ID
exports.deleteRequestById = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedRequest = await Request.findByIdAndDelete(id);

        if (!deletedRequest) {
            return res.status(404).json({ message: 'الطلب غير موجود' });
        }

        res.status(200).json({ message: 'تم حذف الطلب بنجاح' });
    } catch (error) {
        res.status(500).json({ message: 'حدث خطأ أثناء الحذف', error });
    }
};
