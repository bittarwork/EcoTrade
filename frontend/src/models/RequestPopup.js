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

    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4" dir="rtl" role="dialog" aria-modal="true" aria-labelledby="request-popup-title">
            <button type="button" onClick={onClose} className="absolute inset-0 cursor-default" aria-label="إغلاق" />
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative z-10 cursor-auto" onClick={(e) => e.stopPropagation()}>
                <div className="p-6 border-b border-gray-100">
                    <h2 id="request-popup-title" className="text-xl font-semibold text-gray-800">إنشاء طلب جديد</h2>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label htmlFor="request-address" className="block text-sm font-medium text-gray-700 mb-1">العنوان (حدد الموقع على الخريطة)</label>
                        <input
                            id="request-address"
                            type="text"
                            value={newRequest.address}
                            readOnly
                            placeholder="اختر نقطة على الخريطة"
                            className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="request-scrapType" className="block text-sm font-medium text-gray-700 mb-1">نوع الخردة</label>
                        <input
                            id="request-scrapType"
                            type="text"
                            name="scrapType"
                            placeholder="مثال: نحاس، ألمنيوم..."
                            value={newRequest.scrapType}
                            onChange={(e) => setNewRequest({ ...newRequest, scrapType: e.target.value })}
                            className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">الصور (حتى 5)</label>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                    </div>
                    <div>
                        <span className="block text-sm font-medium text-gray-700 mb-2">الموقع على الخريطة</span>
                        <MapComponent
                            position={newRequest.position}
                            setPosition={(pos) => setNewRequest(prev => ({ ...prev, position: pos }))}
                        />
                    </div>
                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
                        >
                            إرسال الطلب
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
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
