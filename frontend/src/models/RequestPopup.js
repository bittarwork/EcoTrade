import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapComponent from '../components/MapComponent';

const RequestPopup = ({ onClose, onCreateRequest }) => {
    const [newRequest, setNewRequest] = useState({
        address: '',
        scrapType: '',
        images: [],
        position: [33.5156, 36.3095],
    });

    // دالة لجلب العنوان بناءً على الإحداثيات
    const fetchAddress = async (lat, lng) => {
        try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
            if (response.data && response.data.display_name) {
                setNewRequest((prevRequest) => ({
                    ...prevRequest,
                    address: response.data.display_name,
                }));
            }
        } catch (error) {
            console.error('خطأ في جلب العنوان:', error);
        }
    };

    useEffect(() => {
        const [lat, lng] = newRequest.position;
        fetchAddress(lat, lng);
    }, [newRequest.position]);

    const handleImageChange = (e) => {
        setNewRequest((prevRequest) => ({
            ...prevRequest,
            images: [...e.target.files],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreateRequest(newRequest);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded shadow-lg w-11/12 max-w-lg">
                <h2 className="text-2xl font-semibold text-center mb-6">إنشاء طلب جديد</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        value={newRequest.address}
                        readOnly
                        placeholder="عنوان الطلب (حدد الموقع على الخريطة)"
                        className="block w-full p-3 border border-gray-300 rounded bg-gray-100 focus:outline-none"
                    />
                    <input
                        type="text"
                        name="scrapType"
                        placeholder="نوع الخردة"
                        value={newRequest.scrapType}
                        onChange={(e) => setNewRequest({ ...newRequest, scrapType: e.target.value })}
                        className="block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                    <input
                        type="file"
                        multiple
                        onChange={handleImageChange}
                        className="block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <div className="mt-4">
                        <MapComponent
                            position={newRequest.position}
                            setPosition={(pos) => setNewRequest({ ...newRequest, position: pos })}
                        />
                    </div>
                    <div className="flex justify-between mt-6">
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-5 py-2 rounded hover:bg-green-600 transition-colors"
                        >
                            إرسال
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 transition-colors"
                        >
                            إلغاء
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RequestPopup;
