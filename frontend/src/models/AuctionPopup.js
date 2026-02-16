// Modern Auction Creation Popup - Enhanced UI/UX with validation
import React, { useState } from 'react';
import { XIcon, PhotographIcon, ExclamationCircleIcon } from '@heroicons/react/outline';

const AuctionPopup = ({ newAuction, handleChange, handleImageUpload, createAuction, closePopup }) => {
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    // Validation rules
    const validate = () => {
        const newErrors = {};

        if (!newAuction.itemName || newAuction.itemName.trim().length < 3) {
            newErrors.itemName = 'اسم العنصر يجب أن يكون 3 أحرف على الأقل';
        }

        if (!newAuction.description || newAuction.description.trim().length < 10) {
            newErrors.description = 'الوصف يجب أن يكون 10 أحرف على الأقل';
        }

        if (!newAuction.category) {
            newErrors.category = 'يرجى اختيار الفئة';
        }

        if (!newAuction.startPrice || newAuction.startPrice <= 0) {
            newErrors.startPrice = 'سعر البداية يجب أن يكون أكبر من صفر';
        }

        if (!newAuction.endDate) {
            newErrors.endDate = 'يرجى تحديد تاريخ الانتهاء';
        } else {
            const endDate = new Date(newAuction.endDate);
            const now = new Date();
            if (endDate <= now) {
                newErrors.endDate = 'تاريخ الانتهاء يجب أن يكون في المستقبل';
            }
        }

        if (!newAuction.images || newAuction.images.length === 0) {
            newErrors.images = 'يجب إضافة صورة واحدة على الأقل';
        } else if (newAuction.images.length > 10) {
            newErrors.images = 'الحد الأقصى 10 صور';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleBlur = (field) => {
        setTouched({ ...touched, [field]: true });
        validate();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setTouched({
            itemName: true,
            description: true,
            category: true,
            startPrice: true,
            endDate: true,
            images: true,
        });

        if (validate()) {
            createAuction();
        }
    };

    const categories = [
        { value: 'Metals', label: 'معادن' },
        { value: 'Plastics', label: 'بلاستيك' },
        { value: 'Electronics', label: 'إلكترونيات' },
        { value: 'Paper and Cardboard', label: 'ورق وكرتون' },
        { value: 'Furniture', label: 'أثاث' },
    ];

    // Get minimum date (now + 1 hour)
    const getMinDateTime = () => {
        const now = new Date();
        now.setHours(now.getHours() + 1);
        return now.toISOString().slice(0, 16);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm" dir="rtl">
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
                {/* Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
                    <h2 className="text-xl font-bold text-gray-800">إضافة مزاد جديد</h2>
                    <button
                        type="button"
                        onClick={closePopup}
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
                    >
                        <XIcon className="h-5 w-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Item Name */}
                    <div>
                        <label htmlFor="itemName" className="mb-2 block text-sm font-medium text-gray-700">
                            اسم العنصر <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="itemName"
                            type="text"
                            name="itemName"
                            placeholder="مثال: لوحة نحاسية قديمة"
                            value={newAuction.itemName}
                            onChange={handleChange}
                            onBlur={() => handleBlur('itemName')}
                            className={`w-full rounded-xl border px-4 py-3 text-sm transition focus:outline-none focus:ring-2 ${
                                touched.itemName && errors.itemName
                                    ? 'border-red-300 focus:ring-red-500/20'
                                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/20'
                            }`}
                        />
                        {touched.itemName && errors.itemName && (
                            <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                                <ExclamationCircleIcon className="h-4 w-4" />
                                {errors.itemName}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="mb-2 block text-sm font-medium text-gray-700">
                            وصف العنصر <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="وصف تفصيلي للعنصر، الحالة، المميزات..."
                            value={newAuction.description}
                            onChange={handleChange}
                            onBlur={() => handleBlur('description')}
                            rows="4"
                            className={`w-full rounded-xl border px-4 py-3 text-sm transition focus:outline-none focus:ring-2 ${
                                touched.description && errors.description
                                    ? 'border-red-300 focus:ring-red-500/20'
                                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/20'
                            }`}
                        />
                        {touched.description && errors.description && (
                            <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                                <ExclamationCircleIcon className="h-4 w-4" />
                                {errors.description}
                            </p>
                        )}
                    </div>

                    {/* Category and Price */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Category */}
                        <div>
                            <label htmlFor="category" className="mb-2 block text-sm font-medium text-gray-700">
                                الفئة <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={newAuction.category}
                                onChange={handleChange}
                                onBlur={() => handleBlur('category')}
                                className={`w-full rounded-xl border px-4 py-3 text-sm transition focus:outline-none focus:ring-2 ${
                                    touched.category && errors.category
                                        ? 'border-red-300 focus:ring-red-500/20'
                                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/20'
                                }`}
                            >
                                {categories.map(cat => (
                                    <option key={cat.value} value={cat.value}>
                                        {cat.label}
                                    </option>
                                ))}
                            </select>
                            {touched.category && errors.category && (
                                <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                                    <ExclamationCircleIcon className="h-4 w-4" />
                                    {errors.category}
                                </p>
                            )}
                        </div>

                        {/* Start Price */}
                        <div>
                            <label htmlFor="startPrice" className="mb-2 block text-sm font-medium text-gray-700">
                                سعر البداية (ل.س) <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="startPrice"
                                type="number"
                                name="startPrice"
                                placeholder="1000"
                                min="1"
                                value={newAuction.startPrice}
                                onChange={handleChange}
                                onBlur={() => handleBlur('startPrice')}
                                className={`w-full rounded-xl border px-4 py-3 text-sm transition focus:outline-none focus:ring-2 ${
                                    touched.startPrice && errors.startPrice
                                        ? 'border-red-300 focus:ring-red-500/20'
                                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/20'
                                }`}
                            />
                            {touched.startPrice && errors.startPrice && (
                                <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                                    <ExclamationCircleIcon className="h-4 w-4" />
                                    {errors.startPrice}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* End Date */}
                    <div>
                        <label htmlFor="endDate" className="mb-2 block text-sm font-medium text-gray-700">
                            تاريخ ووقت الانتهاء <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="endDate"
                            type="datetime-local"
                            name="endDate"
                            min={getMinDateTime()}
                            value={newAuction.endDate}
                            onChange={handleChange}
                            onBlur={() => handleBlur('endDate')}
                            className={`w-full rounded-xl border px-4 py-3 text-sm transition focus:outline-none focus:ring-2 ${
                                touched.endDate && errors.endDate
                                    ? 'border-red-300 focus:ring-red-500/20'
                                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/20'
                            }`}
                        />
                        {touched.endDate && errors.endDate && (
                            <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                                <ExclamationCircleIcon className="h-4 w-4" />
                                {errors.endDate}
                            </p>
                        )}
                    </div>

                    {/* Images */}
                    <div>
                        <label htmlFor="images" className="mb-2 block text-sm font-medium text-gray-700">
                            صور العنصر (حتى 10 صور) <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                id="images"
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={(e) => {
                                    handleImageUpload(e);
                                    setTouched({ ...touched, images: true });
                                }}
                                onBlur={() => handleBlur('images')}
                                className="hidden"
                            />
                            <label
                                htmlFor="images"
                                className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-8 transition ${
                                    touched.images && errors.images
                                        ? 'border-red-300 bg-red-50/50'
                                        : 'border-gray-300 bg-gray-50 hover:border-blue-500 hover:bg-blue-50/50'
                                }`}
                            >
                                <PhotographIcon className="mb-2 h-10 w-10 text-gray-400" />
                                <span className="text-sm font-medium text-gray-700">
                                    {newAuction.images.length > 0
                                        ? `تم اختيار ${newAuction.images.length} صورة`
                                        : 'اضغط لاختيار الصور'}
                                </span>
                                <span className="mt-1 text-xs text-gray-500">PNG, JPG, JPEG (حتى 10 صور)</span>
                            </label>
                        </div>
                        {touched.images && errors.images && (
                            <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                                <ExclamationCircleIcon className="h-4 w-4" />
                                {errors.images}
                            </p>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            className="flex-1 rounded-xl bg-blue-600 py-3 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        >
                            إنشاء المزاد
                        </button>
                        <button
                            type="button"
                            onClick={closePopup}
                            className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500/50"
                        >
                            إلغاء
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AuctionPopup;
