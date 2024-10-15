import React, { useState } from 'react';
import MapComponent from '../components/MapComponent';

const RequestPopup = ({ onClose, onCreateRequest }) => {
    const [newRequest, setNewRequest] = useState({
        address: '',
        scrapType: '',
        images: [],
        position: [33.5156, 36.3095],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreateRequest(newRequest);
        onClose(); // إغلاق المنبثقة بعد الإرسال
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-11/12 max-w-lg">
                <h2 className="text-2xl font-semibold mb-4">إنشاء طلب جديد</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="عنوان الطلب"
                        value={newRequest.address}
                        onChange={(e) => setNewRequest({ ...newRequest, address: e.target.value })}
                        className="block w-full p-2 mb-4 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="text"
                        placeholder="نوع الخردة"
                        value={newRequest.scrapType}
                        onChange={(e) => setNewRequest({ ...newRequest, scrapType: e.target.value })}
                        className="block w-full p-2 mb-4 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="file"
                        multiple
                        onChange={(e) => setNewRequest({ ...newRequest, images: [...e.target.files] })}
                        className="block w-full p-2 mb-4 border border-gray-300 rounded"
                    />
                    <MapComponent position={newRequest.position} setPosition={(pos) => setNewRequest({ ...newRequest, position: pos })} />
                    <div className="flex justify-between mt-4">
                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                            إرسال
                        </button>
                        <button type="button" onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                            إلغاء
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RequestPopup;
