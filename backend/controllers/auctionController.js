const Auction = require('../models/auctionModel');
const User = require('../models/userModel');
const upload = require('../config/multerConfig'); // استيراد إعداد multer

const createAuction = async (req, res) => {
    try {
        // التأكد من أن الصور تم رفعها
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'يجب رفع صورة واحدة على الأقل.' });
        }

        // إنشاء كائن جديد من المزاد
        const auctionData = {
            itemName: req.body.itemName,
            description: req.body.description,
            category: req.body.category,
            startPrice: req.body.startPrice,
            endDate: req.body.endDate,
            currentBid: 0, // أو أي قيمة افتراضية أخرى
            images: req.files.map(file => `http://localhost:5000/${file.path}`), // تغيير الرابط وفقًا لإعدادات الخادم
        };

        // حفظ المزاد في قاعدة البيانات
        const newAuction = await Auction.create(auctionData);

        // إعادة المزاد الجديد
        res.status(201).json(newAuction);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'حدث خطأ أثناء إنشاء المزاد.', error: error.message });
    }
};

// دالة لاسترجاع جميع المزادات
const getAllAuctions = async (req, res) => {
    try {
        // استرجاع جميع المزادات
        const auctions = await Auction.find();

        // إعادة المزادات كاستجابة
        res.status(200).json(auctions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'حدث خطأ أثناء استرجاع المزادات.', error: error.message });
    }
};

// دالة لتقديم عرض على مزاد معين
const placeBid = async (req, res) => {
    try {
        const { auctionId, bidAmount } = req.body;

        // تحقق من وجود المزاد
        const auction = await Auction.findById(auctionId);
        if (!auction) {
            return res.status(404).json({ message: 'Auction not found' });
        }

        // تحقق من صحة العرض
        if (bidAmount <= auction.currentBid) {
            return res.status(400).json({ message: 'Bid must be higher than current bid' });
        }

        // تحديث المزاد
        auction.currentBid = bidAmount;
        auction.currentBidder = req.user._id; // تعيين المزايد الحالي
        await auction.save();

        return res.status(200).json(auction);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

// دالة لاسترجاع تفاصيل مزاد محدد
const getAuctionDetails = async (req, res) => {
    const { auctionId } = req.params; // الحصول على auctionId من معلمات الطلب

    try {
        const auction = await Auction.findById(auctionId);

        if (!auction) {
            return res.status(404).json({ message: 'المزاد غير موجود.' });
        }

        res.status(200).json(auction);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'حدث خطأ أثناء استرجاع تفاصيل المزاد.', error: error.message });
    }
};

// دالة لإغلاق مزاد معين
const closeAuction = async (req, res) => {
    const { auctionId } = req.params; // الحصول على auctionId من معلمات الطلب

    try {
        // تحديث حالة المزاد إلى 'closed'
        const auction = await Auction.findByIdAndUpdate(
            auctionId,
            { status: 'closed' },
            { new: true } // إعادة الوثيقة المحدّثة
        );

        // التحقق مما إذا كان المزاد موجودًا
        if (!auction) {
            return res.status(404).json({ message: 'المزاد غير موجود.' });
        }

        // إعادة المزاد المحدّث كاستجابة
        res.status(200).json({ message: 'المزاد مغلق بنجاح.', auction });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'حدث خطأ أثناء إغلاق المزاد.', error: error.message });
    }
};

// دالة لحذف مزاد معين
const deleteAuction = async (req, res) => {
    const { auctionId } = req.params; // الحصول على auctionId من معلمات الطلب

    try {
        // حذف المزاد من قاعدة البيانات
        const auction = await Auction.findByIdAndDelete(auctionId);

        // التحقق مما إذا كان المزاد موجودًا
        if (!auction) {
            return res.status(404).json({ message: 'المزاد غير موجود.' });
        }

        // إعادة استجابة النجاح
        res.status(200).json({ message: 'تم حذف المزاد بنجاح.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'حدث خطأ أثناء حذف المزاد.', error: error.message });
    }
};

// دالة لاسترجاع جميع العروض الحالية لمزاد معين
const getCurrentBids = async (req, res) => {
    try {
        const { auctionId } = req.params;

        // تحقق من وجود المزاد
        const auction = await Auction.findById(auctionId);
        if (!auction) {
            return res.status(404).json({ message: 'Auction not found' });
        }

        return res.status(200).json({ currentBid: auction.currentBid, currentBidder: auction.currentBidder });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

// دالة لتحديث عرض المزايدة الحالي
const updateBid = async (req, res) => {
    try {
        const { auctionId, newBidAmount } = req.body;

        // تحقق من وجود المزاد
        const auction = await Auction.findById(auctionId);
        if (!auction) {
            return res.status(404).json({ message: 'Auction not found' });
        }

        // تحقق من أن المزايد الحالي هو المستخدم
        if (!auction.currentBidder.equals(req.user._id)) {
            return res.status(403).json({ message: 'You are not the current bidder' });
        }

        // تحقق من صحة العرض
        if (newBidAmount <= auction.currentBid) {
            return res.status(400).json({ message: 'New bid must be higher than current bid' });
        }

        // تحديث المزاد
        auction.currentBid = newBidAmount;
        await auction.save();

        return res.status(200).json(auction);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

// دالة لاسترجاع أعلى المزايدين لمزاد معين
const getTopBidders = async (req, res) => {
    try {
        const { auctionId } = req.params;

        // تحقق من وجود المزاد
        const auction = await Auction.findById(auctionId);
        if (!auction) {
            return res.status(404).json({ message: 'Auction not found' });
        }

        // استخدم وظائف مخصصة لاسترجاع أعلى المزايدين إذا لزم الأمر
        // هذا يتطلب تخزين العروض في نموذج العروض أو نموذج آخر مخصص

        return res.status(200).json({ message: 'Top bidders retrieval is not implemented yet' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};
const cancelAuction = async (req, res) => {
    const { auctionId } = req.params; // الحصول على auctionId من معلمات الطلب

    try {
        // تحديث حالة المزاد إلى 'canceled'
        const auction = await Auction.findByIdAndUpdate(
            auctionId,
            { status: 'canceled' },
            { new: true } // إعادة الوثيقة المحدّثة
        );

        // التحقق مما إذا كان المزاد موجودًا
        if (!auction) {
            return res.status(404).json({ message: 'المزاد غير موجود.' });
        }

        // إعادة المزاد المحدّث كاستجابة
        res.status(200).json({ message: 'المزاد ملغى بنجاح.', auction });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'حدث خطأ أثناء إلغاء المزاد.', error: error.message });
    }
};
module.exports = {
    cancelAuction,
    createAuction,
    getAllAuctions,
    placeBid,
    getAuctionDetails,
    closeAuction,
    deleteAuction,
    getCurrentBids,
    updateBid,
    getTopBidders,
};
