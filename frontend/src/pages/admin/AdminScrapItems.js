

import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../context/UserContext';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ConfirmModal from '../../models/ConfirmModal';
import PopupForm from '../../models/ScrapFormPopup';
import ScreapItemsAnalytics from '../../models/ScreapItemsAnalytics';

const AdminScrapItems = () => {
    const { user } = useContext(UserContext);
    const [scrapItems, setScrapItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isPopupOpen, setPopupOpen] = useState(false); // التحكم في البوب أب
    const [itemToDelete, setItemToDelete] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItemId, setCurrentItemId] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        quantity: '',
        status: '',
        barcode: '',
        estimatedPrice: '',
        source: '',
        images: [],
    });
    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            category: '',
            quantity: '',
            status: '',
            barcode: '',
            estimatedPrice: '',
            source: '',
            images: [],
        });
    };

    const fetchScrapItems = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/scrap`);
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`فشل في جلب البيانات: ${errorMessage}`);
            }
            const data = await response.json();
            setScrapItems(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const createScrapItem = async (formData) => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/scrap`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`فشل في إنشاء العنصر: ${errorMessage}`);
            }

            const data = await response.json();
            setScrapItems((prevItems) => [...prevItems, data.data]);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const updateScrapItem = async (id, updatedFormData) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/api/scrap/${id}`, {
                method: 'PUT',
                body: updatedFormData,
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`فشل في تحديث العنصر: ${errorMessage}`);
            }

            const updatedItem = await response.json();
            setScrapItems((prevItems) =>
                prevItems.map((item) => (item._id === id ? updatedItem.data : item))
            );
            setIsEditing(false);
            setCurrentItemId(null);
            resetForm();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const deleteScrapItem = async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/scrap/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`فشل في حذف العنصر: ${errorMessage}`);
            }
            setScrapItems((prevItems) => prevItems.filter(item => item._id !== id));
        } catch (err) {
            setError(err.message);
        } finally {
            setModalOpen(false);
        }
    };

    const handleDeleteClick = (id) => {
        setItemToDelete(id);
        setModalOpen(true);
    };

    const handleEditClick = (item) => {
        setFormData({
            name: item.name,
            description: item.description,
            category: item.category,
            quantity: item.quantity,
            status: item.status,
            barcode: item.barcode,
            estimatedPrice: item.estimatedPrice,
            source: item.source,
            images: [],
        });
        setCurrentItemId(item._id);
        setIsEditing(true);
        setPopupOpen(true); // فتح البوب أب
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "images") {
            // التأكد من التعامل مع ملفات الصور
            setFormData({ ...formData, images: files });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newFormData = new FormData();
        for (const key in formData) {
            if (key === 'images') {
                // التأكد من أن images هو FileList وتحويله إلى مصفوفة
                Array.from(formData.images).forEach((file) => {
                    newFormData.append('images', file);
                });
            } else {
                newFormData.append(key, formData[key]);
            }
        }

        if (isEditing && currentItemId) {
            updateScrapItem(currentItemId, newFormData);
        } else {
            createScrapItem(newFormData);
        }
        resetForm();
        setPopupOpen(false); // إغلاق البوب أب بعد الإرسال
    };




    useEffect(() => {
        if (user && user.role === "admin") {
            fetchScrapItems();
        } else {
            setLoading(false);
        }
    }, [user]);

    if (loading) {
        return <h1 className="text-center text-xl">جارٍ التحميل...</h1>;
    }

    if (error) {
        return (
            <div className="text-center">
                <h1 className="text-xl text-red-500">خطأ: {error}</h1>
                <button onClick={fetchScrapItems} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">إعادة المحاولة</button>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4" dir='rtl'>
            {user && user.role === "admin" ? (
                <div>
                    <h1 className="text-3xl font-bold mb-6 text-center">
                        إدارة المواد
                    </h1>
                    <ScreapItemsAnalytics scrapItems={scrapItems} ></ScreapItemsAnalytics>

                    {/* زر إضافة عنصر جديد */}
                    <button onClick={() => setPopupOpen(true)} className="bg-blue-500 text-white py-2 px-4 rounded mb-4">إضافة عنصر جديد</button>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {scrapItems.map(item => (
                            <div
                                key={item._id}
                                className="bg-white shadow-lg rounded-lg overflow-hidden  transform hover:shadow-xl transition-all duration-300 mb-6"
                            >
                                {/* Slider for Images */}
                                <Slider {...settings}>
                                    {item.images.map((img, index) => (
                                        <div key={index} className="h-56">
                                            <img
                                                src={img}
                                                alt={item.name}
                                                className="w-full h-full object-cover transition-opacity hover:opacity-90"
                                                onError={(e) => { e.target.src = 'path/to/default-image.jpg'; }}
                                            />
                                        </div>
                                    ))}
                                </Slider>

                                {/* Content Section */}
                                <div className="p-6">
                                    {/* Name */}
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{item.name}</h2>

                                    {/* Description */}
                                    <p className="text-gray-700 text-sm mb-4">{item.description}</p>

                                    {/* Information Grid */}
                                    <div className="grid grid-cols-2 gap-4 text-gray-800">
                                        <div className="flex items-center">
                                            <span className="font-semibold mr-2">الفئة:</span>
                                            <span className="text-gray-600">{item.category}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="font-semibold mr-2">الكمية:</span>
                                            <span className="text-gray-600">{item.quantity}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="font-semibold mr-2">الحالة:</span>
                                            <span className="text-gray-600">{item.status}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="font-semibold mr-2">السعر التقديري:</span>
                                            <span className="text-gray-600">{item.estimatedPrice} ل.س</span>
                                        </div>
                                    </div>

                                    {/* Status Label */}
                                    <div className="mt-4">
                                        {item.description.includes("Auto-generated item from request") ? (
                                            <span className="inline-block bg-green-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                                                Auto-generated
                                            </span>
                                        ) : (
                                            <span className="inline-block bg-yellow-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                                                Regular
                                            </span>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="mt-6 flex gap-x-2 justify-between">
                                        <button
                                            onClick={() => handleEditClick(item)}
                                            className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-200 flex-1 mr-2"
                                        >
                                            تعديل
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(item._id)}
                                            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200 flex-1"
                                        >
                                            حذف
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>

                    {/* البوب أب للإضافة والتعديل */}
                    <PopupForm
                        isOpen={isPopupOpen}
                        onClose={() => { setPopupOpen(false); resetForm(); }}
                        formData={formData}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit}
                        isEditing={isEditing}
                    />

                    {/* المودال لتأكيد الحذف */}
                    <ConfirmModal
                        isOpen={isModalOpen}
                        onClose={() => setModalOpen(false)}
                        onConfirm={() => { deleteScrapItem(itemToDelete); setModalOpen(false); }}
                    />
                </div>
            ) : (
                <p>لا تملك الصلاحيات اللازمة لعرض هذه الصفحة.</p>
            )}
        </div>
    );
};

export default AdminScrapItems;
