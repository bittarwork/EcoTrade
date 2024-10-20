import React from 'react';

const PopupForm = ({ isOpen, onClose, formData, handleInputChange, handleSubmit, isEditing }) => {
    if (!isOpen) return null; // لا يظهر البوب أب إذا لم يكن مفتوحاً

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    {isEditing ? "تعديل العنصر" : "إضافة عنصر جديد"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="name" placeholder="الاسم" value={formData.name} onChange={handleInputChange} className="w-full p-2 border rounded-md" />
                    <input type="text" name="description" placeholder="الوصف" value={formData.description} onChange={handleInputChange} className="w-full p-2 border rounded-md" />

                    <select name="category" value={formData.category} onChange={handleInputChange} className="w-full p-2 border rounded-md">
                        <option value="">اختر الفئة</option>
                        <option value="Metals">Metals</option>
                        <option value="Plastics">Plastics</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Paper and Cardboard">Paper and Cardboard</option>
                        <option value="Furniture">Furniture</option>
                    </select>

                    <input type="number" name="quantity" placeholder="الكمية" value={formData.quantity} onChange={handleInputChange} className="w-full p-2 border rounded-md" />

                    <select name="status" value={formData.status} onChange={handleInputChange} className="w-full p-2 border rounded-md">
                        <option value="">اختر الحالة</option>
                        <option value="Received">Received</option>
                        <option value="Processed">Processed</option>
                        <option value="Ready for Recycling">Ready for Recycling</option>
                        <option value="Ready for Auction">Ready for Auction</option>
                    </select>

                    <input type="text" name="barcode" placeholder="الباركود" value={formData.barcode} onChange={handleInputChange} className="w-full p-2 border rounded-md" />
                    <input type="number" name="estimatedPrice" placeholder="السعر التقديري" value={formData.estimatedPrice} onChange={handleInputChange} className="w-full p-2 border rounded-md" />

                    <select name="source" value={formData.source} onChange={handleInputChange} className="w-full p-2 border rounded-md">
                        <option value="">اختر المصدر</option>
                        <option value="User Request">User Request</option>
                        <option value="Admin Manual Entry">Admin Manual Entry</option>
                    </select>

                    <input type="file" name="images" multiple onChange={(e) => handleInputChange(e)} className="w-full p-2 border rounded-md" />

                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-md">إغلاق</button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                            {isEditing ? "تحديث العنصر" : "إضافة عنصر"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PopupForm;















