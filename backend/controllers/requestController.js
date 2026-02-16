const Request = require('../models/requestModel');
const User = require('../models/userModel');
const upload = require('../config/multerConfig');

// Helper function to get full image path
const getFullImagePath = (images, req) => {
    return images.map(image => {
        return image.startsWith('uploads/')
            ? `${req.protocol}://${req.get('host')}/${image}`
            : image;
    });
};

// Create new request
exports.createRequest = [
    upload.array('images', 5),
    async (req, res) => {
        try {
            const { userId, address, scrapType, position } = req.body;

            // Validate required fields
            if (!userId || !address || !scrapType) {
                return res.status(400).json({ 
                    message: 'يرجى تعبئة جميع الحقول المطلوبة (العنوان، نوع الخردة)' 
                });
            }

            // Verify user exists
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'المستخدم غير موجود' });
            }

            // Verify authenticated user is creating their own request
            if (req.user.id !== userId) {
                return res.status(403).json({ 
                    message: 'غير مصرح لك بإنشاء طلبات لمستخدمين آخرين' 
                });
            }

            // Validate images
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ 
                    message: 'يجب تحميل صورة واحدة على الأقل' 
                });
            }

            if (req.files.length > 5) {
                return res.status(400).json({ 
                    message: 'الحد الأقصى هو 5 صور' 
                });
            }

            const images = req.files.map(file => `uploads/${file.filename}`);

            // Parse position if provided
            let parsedPosition = null;
            if (position) {
                try {
                    const posData = typeof position === 'string' ? JSON.parse(position) : position;
                    if (Array.isArray(posData) && posData.length === 2) {
                        parsedPosition = {
                            lat: parseFloat(posData[0]),
                            lng: parseFloat(posData[1])
                        };
                    }
                } catch (error) {
                    console.error('Error parsing position:', error);
                }
            }

            // Create new request
            const newRequest = new Request({
                userId,
                address,
                scrapType,
                images,
                position: parsedPosition,
            });
            
            await newRequest.save();

            res.status(201).json({
                message: 'طلب جديد تم إنشاؤه بنجاح',
                request: {
                    id: newRequest._id,
                    userId,
                    address,
                    scrapType,
                    images: getFullImagePath(images, req),
                    position: parsedPosition,
                    status: newRequest.status,
                    createdAt: newRequest.createdAt,
                }
            });
        } catch (error) {
            console.error('Error creating request:', error);
            res.status(500).json({ 
                message: 'فشل في إنشاء الطلب', 
                error: error.message 
            });
        }
    }
];

// Get user requests
exports.getUserRequests = async (req, res) => {
    try {
        const userId = req.params.id;

        // Verify authenticated user is requesting their own data or is admin
        if (req.user.id !== userId && req.user.role !== 'admin') {
            return res.status(403).json({ 
                message: 'غير مصرح لك بالوصول إلى طلبات مستخدمين آخرين' 
            });
        }

        // Verify user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'المستخدم غير موجود' });
        }

        const requests = await Request.find({ userId })
            .populate('userId', 'name email')
            .sort({ createdAt: -1 }); // Sort by newest first

        const formattedRequests = requests.map(request => ({
            id: request._id,
            address: request.address,
            scrapType: request.scrapType,
            images: getFullImagePath(request.images, req),
            position: request.position,
            status: request.status,
            notes: request.notes,
            createdAt: request.createdAt,
            updatedAt: request.updatedAt,
            completedAt: request.completedAt,
            canceledAt: request.canceledAt,
        }));

        res.status(200).json(formattedRequests);
    } catch (error) {
        console.error('Error fetching user requests:', error);
        res.status(500).json({ 
            message: 'فشل في استرجاع الطلبات', 
            error: error.message 
        });
    }
};

// Update request status (admin only)
exports.updateRequestStatus = async (req, res) => {
    try {
        const { requestId, status, notes } = req.body;

        // Validate status
        if (!['completed', 'canceled'].includes(status)) {
            return res.status(400).json({ 
                message: 'الحالة غير صالحة. يجب أن تكون "completed" أو "canceled"' 
            });
        }

        // Find request
        const request = await Request.findById(requestId);
        if (!request) {
            return res.status(404).json({ message: 'الطلب غير موجود' });
        }

        // Check if already in that status
        if (request.status === status) {
            return res.status(400).json({ 
                message: `الطلب ${status === 'completed' ? 'مكتمل' : 'ملغي'} مسبقاً` 
            });
        }

        // Prepare update object
        const updateData = { status };
        
        if (status === 'completed') {
            updateData.completedAt = new Date();
            updateData.completedBy = req.user.id;
        } else if (status === 'canceled') {
            updateData.canceledAt = new Date();
            updateData.canceledBy = req.user.id;
        }

        if (notes) {
            updateData.notes = notes;
        }

        // Update request
        const updatedRequest = await Request.findByIdAndUpdate(
            requestId, 
            updateData, 
            { new: true }
        );

        res.status(200).json({
            message: `تم ${status === 'completed' ? 'إكمال' : 'إلغاء'} الطلب بنجاح`,
            request: {
                id: updatedRequest._id,
                address: updatedRequest.address,
                scrapType: updatedRequest.scrapType,
                images: getFullImagePath(updatedRequest.images, req),
                position: updatedRequest.position,
                status: updatedRequest.status,
                notes: updatedRequest.notes,
                createdAt: updatedRequest.createdAt,
                updatedAt: updatedRequest.updatedAt,
                completedAt: updatedRequest.completedAt,
                canceledAt: updatedRequest.canceledAt,
            }
        });
    } catch (error) {
        console.error('Error updating request status:', error);
        res.status(500).json({ 
            message: 'فشل في تحديث حالة الطلب', 
            error: error.message 
        });
    }
};

// Get requests grouped by user (admin only)
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
            {
                $sort: { 'requests.createdAt': -1 } // Sort by newest requests
            }
        ]);

        // Format image paths
        requests.forEach(request => {
            const profileImage = request.user.profileImage;
            request.user.profileImage = profileImage 
                ? `${req.protocol}://${req.get('host')}/${profileImage.replace(/\\/g, '/')}` 
                : null;

            request.requests.forEach(reqItem => {
                reqItem.images = reqItem.images.map(image => {
                    return `${req.protocol}://${req.get('host')}/${image.replace(/\\/g, '/')}`;
                });
            });
        });

        res.status(200).json(requests);
    } catch (error) {
        console.error('Error fetching grouped requests:', error);
        res.status(500).json({ 
            message: 'حدث خطأ أثناء جلب الطلبات', 
            error: error.message 
        });
    }
};

// Delete request by ID (admin only)
exports.deleteRequestById = async (req, res) => {
    try {
        const { id } = req.params;

        // Verify request exists
        const request = await Request.findById(id);
        if (!request) {
            return res.status(404).json({ message: 'الطلب غير موجود' });
        }

        // Delete request
        await Request.findByIdAndDelete(id);

        res.status(200).json({ 
            message: 'تم حذف الطلب بنجاح',
            deletedId: id
        });
    } catch (error) {
        console.error('Error deleting request:', error);
        res.status(500).json({ 
            message: 'حدث خطأ أثناء الحذف', 
            error: error.message 
        });
    }
};
