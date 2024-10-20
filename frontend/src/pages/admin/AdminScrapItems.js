import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../context/UserContext';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ConfirmModal from '../../models/ConfirmModal'; // استيراد المودال

const AdminScrapItems = () => {
    const { user } = useContext(UserContext);
    const [scrapItems, setScrapItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
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

    const deleteScrapItem = async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/scrap/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`فشل في حذف العنصر: ${errorMessage}`);
            }
            // تحديث الحالة بعد الحذف
            setScrapItems((prevItems) => prevItems.filter(item => item._id !== id));
        } catch (err) {
            setError(err.message);
        } finally {
            setModalOpen(false); // إغلاق المودال بعد العملية
        }
    };

    const handleDeleteClick = (id) => {
        setItemToDelete(id); // تعيين العنصر المراد حذفه
        setModalOpen(true); // فتح المودال
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
                    <h1 className="text-3xl font-bold mb-6 text-center">عناصر الخردة للإدارة</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {scrapItems.map(item => (
                            <div key={item._id} className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105">
                                <Slider {...settings}>
                                    {item.images.map((img, index) => (
                                        <div key={index}>
                                            <img
                                                src={`${img}`}
                                                alt={item.name}
                                                className="w-full h-48 object-cover"
                                                onError={(e) => { e.target.src = 'path/to/default-image.jpg'; }} // صورة افتراضية
                                            />
                                        </div>
                                    ))}
                                </Slider>
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
                                    <p className="text-gray-600 mb-2">{item.description}</p>
                                    <div className="text-gray-800 font-medium mb-1">
                                        <span>الفئة: {item.category}</span>
                                    </div>
                                    <div className="text-gray-800 font-medium mb-1">
                                        <span>الكمية: {item.quantity}</span>
                                    </div>
                                    <div className="text-gray-800 font-medium mb-1">
                                        <span>الحالة: {item.status}</span>
                                    </div>
                                    <div className="text-gray-800 font-medium mb-1">
                                        <span>السعر التقديري: {item.estimatedPrice}</span>
                                    </div>
                                    {item.description.includes("Auto-generated item from request")
                                        ? (<p className="text-xl text-white font-medium bg-green-600 px-3 py-2 mt-3 border rounded-xl">Auto-generated</p>)
                                        : (<p className="text-xl text-white font-medium bg-yellow-600 px-3 py-2 mt-3 border rounded-xl">Regular</p>)}
                                    {/* زر الحذف */}
                                    <button
                                        onClick={() => handleDeleteClick(item._id)}
                                        className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">
                                        حذف
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* مودال التأكيد */}
                    <ConfirmModal
                        isOpen={isModalOpen}
                        onClose={() => setModalOpen(false)}
                        onConfirm={() => itemToDelete && deleteScrapItem(itemToDelete)}
                        message="هل أنت متأكد أنك تريد حذف هذه المادة؟"
                    />
                </div>
            ) : (
                <h1 className="text-center text-xl text-red-500">تم رفض الوصول</h1>
            )}
        </div>
    );
};

export default AdminScrapItems;
