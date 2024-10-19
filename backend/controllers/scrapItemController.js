const ScrapItem = require('../models/scrapItem');

const createScrapItem = async (req, res) => {
    try {
        // التحقق من أن الصور تم رفعها
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: 'يجب رفع صورة واحدة على الأقل.' });
        }

        // التحقق من وجود الحقول الأساسية
        const { name, description, category, quantity, userRequestId, status, barcode, estimatedPrice, source } = req.body;
        if (!name || !description || !category || !quantity || !barcode) {
            return res.status(400).json({ success: false, message: 'الرجاء تقديم جميع الحقول المطلوبة.' });
        }

        // التحقق من أن الباركود فريد
        const existingItem = await ScrapItem.findOne({ barcode });
        if (existingItem) {
            return res.status(400).json({ success: false, message: 'الباكود يجب أن يكون فريدًا ولا يمكن تكراره.' });
        }

        // إنشاء كائن جديد من ScrapItem
        const scrapItemData = {
            name,
            description,
            category,
            quantity,
            userRequestId,
            status,
            barcode,
            estimatedPrice,
            source,
            images: req.files.map(file => `${process.env.BASE_URL}/${file.path}`), // استخدام متغير بيئي
        };

        // حفظ العنصر في قاعدة البيانات
        const newScrapItem = await ScrapItem.create(scrapItemData);

        // إعادة العنصر الجديد مع ردود واضحة
        return res.status(201).json({
            success: true,
            message: 'تم إنشاء العنصر بنجاح.',
            data: newScrapItem,
        });
    } catch (error) {
        console.error('Error creating scrap item:', error);
        return res.status(500).json({
            success: false,
            message: 'حدث خطأ أثناء إنشاء العنصر.',
            error: error.message,
        });
    }
};


// 2. الحصول على جميع العناصر
const getAllScrapItems = async (req, res) => {
    try {
        const scrapItems = await ScrapItem.find();
        res.status(200).json(scrapItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 3. الحصول على عنصر حسب المعرف
const getScrapItemById = async (req, res) => {
    try {
        const scrapItem = await ScrapItem.findById(req.params.id);
        if (!scrapItem) return res.status(404).json({ message: 'Item not found' });
        res.status(200).json(scrapItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 4. تحديث عنصر حسب المعرف
const updateScrapItem = async (req, res) => {
    try {
        // البحث عن العنصر في قاعدة البيانات
        const scrapItem = await ScrapItem.findById(req.params.id);
        if (!scrapItem) {
            return res.status(404).json({ success: false, message: 'العنصر غير موجود.' });
        }

        // إذا تم رفع صور جديدة
        let images = [];
        if (req.files && req.files.length > 0) {
            images = req.files.map(file => `${process.env.BASE_URL}/${file.path}`); // استخدام متغير بيئي
        }

        // تحديث البيانات
        const updatedData = {
            name: req.body.name || scrapItem.name,
            description: req.body.description || scrapItem.description,
            category: req.body.category || scrapItem.category,
            quantity: req.body.quantity || scrapItem.quantity,
            userRequestId: req.body.userRequestId || scrapItem.userRequestId,
            status: req.body.status || scrapItem.status,
            barcode: req.body.barcode || scrapItem.barcode,
            estimatedPrice: req.body.estimatedPrice || scrapItem.estimatedPrice,
            source: req.body.source || scrapItem.source,
            ...(images.length > 0 && { images }),
        };

        // التحقق من أن الباركود فريد (إذا تم تغييره)
        if (req.body.barcode && req.body.barcode !== scrapItem.barcode) {
            const existingItem = await ScrapItem.findOne({ barcode: req.body.barcode });
            if (existingItem) {
                return res.status(400).json({ success: false, message: 'الباكود يجب أن يكون فريدًا ولا يمكن تكراره.' });
            }
        }

        // تحديث العنصر في قاعدة البيانات
        const updatedScrapItem = await ScrapItem.findByIdAndUpdate(req.params.id, updatedData, { new: true, runValidators: true });

        // إعادة العنصر المحدّث
        return res.status(200).json({
            success: true,
            message: 'تم تحديث العنصر بنجاح.',
            data: updatedScrapItem,
        });
    } catch (error) {
        console.error('Error updating scrap item:', error);
        return res.status(500).json({
            success: false,
            message: 'حدث خطأ أثناء تحديث العنصر.',
            error: error.message,
        });
    }
};


// 5. حذف عنصر حسب المعرف
const deleteScrapItem = async (req, res) => {
    try {
        // البحث عن العنصر وحذفه
        const scrapItem = await ScrapItem.findByIdAndDelete(req.params.id);

        // التحقق مما إذا كان العنصر موجودًا
        if (!scrapItem) {
            return res.status(404).json({
                success: false,
                message: 'العنصر غير موجود.'
            });
        }

        // إعادة رد تأكيد مع رسالة توضيحية
        return res.status(200).json({
            success: true,
            message: 'تم حذف العنصر بنجاح.',
            data: scrapItem
        });
    } catch (error) {
        console.error('Error deleting scrap item:', error);
        return res.status(500).json({
            success: false,
            message: 'حدث خطأ أثناء حذف العنصر.',
            error: error.message
        });
    }
};


// تصدير الدوال
module.exports = {
    createScrapItem,
    getAllScrapItems,
    getScrapItemById,
    updateScrapItem,
    deleteScrapItem
};
