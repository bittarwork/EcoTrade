import React, { useState } from 'react';

const AuctionPopup = ({ newAuction, handleChange, handleImageUpload, createAuction, closePopup }) => {
    const [errorMessage, setErrorMessage] = useState('');

    const handleCreateAuction = () => {
        // تحقق من الحقول المطلوبة
        if (!newAuction.itemName || !newAuction.description || !newAuction.category ||
            !newAuction.startPrice || !newAuction.endDate || newAuction.images.length === 0) {
            setErrorMessage('جميع الحقول مطلوبة');
            return;
        }

        // إذا كانت جميع الحقول مملوءة، قم باستدعاء دالة إنشاء المزاد
        setErrorMessage(''); // أزل رسالة الخطأ
        createAuction();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2">
                <h2 className="text-2xl font-semibold mb-4">إضافة مزاد جديد</h2>

                {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>} {/* عرض رسالة الخطأ */}

                <input
                    type="text"
                    name="itemName"
                    placeholder="اسم العنصر"
                    value={newAuction.itemName}
                    onChange={handleChange}
                    className="border p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                    name="description"
                    placeholder="وصف العنصر"
                    value={newAuction.description}
                    onChange={handleChange}
                    className="border p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                    name="category"
                    value={newAuction.category}
                    onChange={handleChange}
                    className="border p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="Metals">معادن</option>
                    <option value="Plastics">بلاستيك</option>
                    <option value="Electronics">إلكترونيات</option>
                    <option value="Paper and Cardboard">ورق وكرتون</option>
                    <option value="Furniture">أثاث</option>
                </select>
                <input
                    type="number"
                    name="startPrice"
                    placeholder="سعر البداية"
                    value={newAuction.startPrice}
                    onChange={handleChange}
                    className="border p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="datetime-local"
                    name="endDate"
                    value={newAuction.endDate}
                    onChange={handleChange}
                    className="border p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="file"
                    multiple
                    onChange={handleImageUpload}
                    className="border p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex justify-between">
                    <button
                        onClick={handleCreateAuction} // استخدام الدالة المعدلة
                        className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200">
                        إنشاء مزاد
                    </button>
                    <button
                        onClick={closePopup}
                        className="bg-gray-300 text-gray-700 p-3 rounded-lg hover:bg-gray-400 transition duration-200">
                        إغلاق
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuctionPopup;
