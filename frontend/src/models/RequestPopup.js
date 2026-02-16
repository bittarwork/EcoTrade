import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapComponent from '../components/MapComponent';
import { XIcon, PhotographIcon, TrashIcon } from '@heroicons/react/outline';

const RequestPopup = ({ onClose, onCreateRequest }) => {
    const [newRequest, setNewRequest] = useState({
        address: '',
        scrapType: '',
        images: [],
        position: [33.5156, 36.3095],
    });
    const [imagePreviews, setImagePreviews] = useState([]);
    const [isLoadingAddress, setIsLoadingAddress] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch address based on coordinates
    const fetchAddress = async (lat, lng) => {
        setIsLoadingAddress(true);
        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
            );
            if (response.data && response.data.display_name) {
                setNewRequest((prevRequest) => ({
                    ...prevRequest,
                    address: response.data.display_name,
                }));
                setErrors(prev => ({ ...prev, address: null }));
            }
        } catch (error) {
            console.error('Error fetching address:', error);
            setErrors(prev => ({ 
                ...prev, 
                address: 'فشل في جلب العنوان. يرجى المحاولة مرة أخرى.' 
            }));
        } finally {
            setIsLoadingAddress(false);
        }
    };

    useEffect(() => {
        const [lat, lng] = newRequest.position;
        fetchAddress(lat, lng);
    }, [newRequest.position]);

    // Handle image selection with validation
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        
        // Validate number of images
        if (files.length > 5) {
            setErrors(prev => ({ 
                ...prev, 
                images: 'يمكنك تحميل 5 صور كحد أقصى' 
            }));
            return;
        }

        // Validate file types and sizes
        const validFiles = [];
        const validPreviews = [];
        let hasError = false;

        files.forEach(file => {
            // Check file type
            if (!file.type.startsWith('image/')) {
                setErrors(prev => ({ 
                    ...prev, 
                    images: 'يجب أن تكون جميع الملفات صورًا' 
                }));
                hasError = true;
                return;
            }

            // Check file size (2MB max)
            if (file.size > 2 * 1024 * 1024) {
                setErrors(prev => ({ 
                    ...prev, 
                    images: 'حجم الصورة يجب أن لا يتجاوز 2 ميجابايت' 
                }));
                hasError = true;
                return;
            }

            validFiles.push(file);
            
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                validPreviews.push(reader.result);
                if (validPreviews.length === validFiles.length) {
                    setImagePreviews(validPreviews);
                }
            };
            reader.readAsDataURL(file);
        });

        if (!hasError && validFiles.length > 0) {
            setNewRequest((prevRequest) => ({
                ...prevRequest,
                images: validFiles,
            }));
            setErrors(prev => ({ ...prev, images: null }));
        }
    };

    // Remove image from selection
    const removeImage = (index) => {
        setNewRequest(prevRequest => ({
            ...prevRequest,
            images: prevRequest.images.filter((_, i) => i !== index),
        }));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};

        if (!newRequest.address.trim()) {
            newErrors.address = 'العنوان مطلوب';
        }

        if (!newRequest.scrapType.trim()) {
            newErrors.scrapType = 'نوع الخردة مطلوب';
        }

        if (newRequest.images.length === 0) {
            newErrors.images = 'يجب تحميل صورة واحدة على الأقل';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        try {
            await onCreateRequest(newRequest);
            onClose();
        } catch (error) {
            console.error('Error creating request:', error);
            setErrors(prev => ({ 
                ...prev, 
                submit: 'فشل في إنشاء الطلب. يرجى المحاولة مرة أخرى.' 
            }));
        } finally {
            setIsSubmitting(false);
        }
    };

    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4 backdrop-blur-sm" dir="rtl" role="dialog" aria-modal="true" aria-labelledby="request-popup-title">
            <button type="button" onClick={onClose} className="absolute inset-0 cursor-default" aria-label="إغلاق" />
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10 cursor-auto" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white p-6">
                    <h2 id="request-popup-title" className="text-xl font-bold text-gray-800">إنشاء طلب جديد</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                        aria-label="إغلاق"
                    >
                        <XIcon className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Submit error message */}
                    {errors.submit && (
                        <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-800">
                            {errors.submit}
                        </div>
                    )}

                    {/* Address field */}
                    <div>
                        <label htmlFor="request-address" className="block text-sm font-semibold text-gray-700 mb-2">
                            العنوان {isLoadingAddress && <span className="text-xs text-blue-600">(جاري التحميل...)</span>}
                        </label>
                        <input
                            id="request-address"
                            type="text"
                            value={newRequest.address}
                            readOnly
                            placeholder="اختر نقطة على الخريطة"
                            className={`block w-full p-3 border rounded-lg bg-gray-50 focus:outline-none ${
                                errors.address ? 'border-red-300' : 'border-gray-300'
                            }`}
                        />
                        {errors.address && (
                            <p className="mt-1 text-xs text-red-600">{errors.address}</p>
                        )}
                    </div>

                    {/* Scrap type field */}
                    <div>
                        <label htmlFor="request-scrapType" className="block text-sm font-semibold text-gray-700 mb-2">
                            نوع الخردة <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="request-scrapType"
                            type="text"
                            name="scrapType"
                            placeholder="مثال: نحاس، ألمنيوم، حديد..."
                            value={newRequest.scrapType}
                            onChange={(e) => {
                                setNewRequest({ ...newRequest, scrapType: e.target.value });
                                setErrors(prev => ({ ...prev, scrapType: null }));
                            }}
                            className={`block w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                errors.scrapType ? 'border-red-300' : 'border-gray-300'
                            }`}
                            required
                        />
                        {errors.scrapType && (
                            <p className="mt-1 text-xs text-red-600">{errors.scrapType}</p>
                        )}
                    </div>

                    {/* Images field */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            الصور <span className="text-red-500">*</span> 
                            <span className="text-xs font-normal text-gray-500"> (حتى 5 صور، 2 ميجابايت لكل صورة)</span>
                        </label>
                        
                        {/* Image previews */}
                        {imagePreviews.length > 0 && (
                            <div className="mb-3 grid grid-cols-3 gap-3 sm:grid-cols-5">
                                {imagePreviews.map((preview, index) => (
                                    <div key={index} className="group relative aspect-square overflow-hidden rounded-lg border-2 border-gray-200">
                                        <img 
                                            src={preview} 
                                            alt={`معاينة ${index + 1}`} 
                                            className="h-full w-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition group-hover:opacity-100"
                                            aria-label={`حذف الصورة ${index + 1}`}
                                        >
                                            <TrashIcon className="h-6 w-6 text-white" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* File input */}
                        <label className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition hover:border-blue-500 hover:bg-blue-50/50 ${
                            errors.images ? 'border-red-300 bg-red-50/30' : 'border-gray-300 bg-gray-50'
                        }`}>
                            <PhotographIcon className="mb-2 h-10 w-10 text-gray-400" />
                            <span className="text-sm font-medium text-gray-700">
                                {imagePreviews.length > 0 ? 'إضافة المزيد من الصور' : 'انقر لاختيار الصور'}
                            </span>
                            <span className="mt-1 text-xs text-gray-500">PNG, JPG, GIF حتى 2MB</span>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>
                        {errors.images && (
                            <p className="mt-1 text-xs text-red-600">{errors.images}</p>
                        )}
                    </div>

                    {/* Map */}
                    <div>
                        <span className="block text-sm font-semibold text-gray-700 mb-2">الموقع على الخريطة</span>
                        <div className="overflow-hidden rounded-lg border-2 border-gray-200">
                            <MapComponent
                                position={newRequest.position}
                                setPosition={(pos) => setNewRequest(prev => ({ ...prev, position: pos }))}
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed shadow-sm"
                        >
                            {isSubmitting ? 'جاري الإرسال...' : 'إرسال الطلب'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
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
