// src/pages/AuctionRoom.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const AuctionRoom = () => {
    const { auctionId } = useParams();
    const [auctionDetails, setAuctionDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [remainingTime, setRemainingTime] = useState(null);

    useEffect(() => {
        const fetchAuctionDetails = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/auction/${auctionId}`);
                if (!response.ok) {
                    throw new Error(`فشل في جلب بيانات المزاد: ${response.statusText}`);
                }
                const data = await response.json();
                setAuctionDetails(data);
                // حساب الوقت المتبقي لانتهاء المزاد
                calculateRemainingTime(data.endDate);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        const calculateRemainingTime = (endDate) => {
            const end = new Date(endDate).getTime();
            const updateTimer = () => {
                const now = new Date().getTime();
                const distance = end - now;

                if (distance < 0) {
                    setRemainingTime("انتهى المزاد");
                } else {
                    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                    setRemainingTime(`${hours}س ${minutes}د ${seconds}ث`);
                }
            };
            updateTimer();
            const interval = setInterval(updateTimer, 1000);
            return () => clearInterval(interval);
        };

        fetchAuctionDetails();
    }, [auctionId]);

    if (loading) return <div className="text-center">جارٍ تحميل البيانات...</div>;
    if (error) return <div className="text-red-500 text-center">خطأ: {error}</div>;
    if (!auctionDetails) return null;

    return (
        <div className="flex flex-col min-h-screen">
            <div className="container mx-auto flex flex-row w-full">
                {/* عمود تفاصيل المزاد */}
                <div className="flex-1 mr-4 w-1/2">
                    <div
                        dir='rtl'
                        className={`border p-4 rounded-lg shadow-lg transition-all duration-300 
                            ${auctionDetails.status === 'canceled' ? 'bg-red-100 border-red-300' : auctionDetails.status === 'closed' ? 'bg-gray-100 border-gray-300' : 'bg-white hover:shadow-xl border-gray-300'}`}
                    >
                        <h1 className="font-bold text-3xl mb-4 text-center">غرفة المزاد - {auctionDetails.itemName}</h1>

                        {/* عرض الصور بجانب بعضها البعض */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            {auctionDetails.images.map((image, index) => (
                                <div key={index}>
                                    <img src={image} alt={`مزاد ${auctionDetails.itemName}`} className="w-full h-48 object-cover mb-2 rounded-lg" />
                                </div>
                            ))}
                        </div>

                        <p className="text-gray-700 mb-2">{auctionDetails.description}</p>
                        <p className="mb-1"><strong>الفئة:</strong> {auctionDetails.category}</p>
                        <p className="mb-1"><strong>سعر البداية:</strong> {auctionDetails.startPrice} ل.س</p>
                        <p className="mb-1"><strong>العطاء الحالي:</strong> {auctionDetails.currentBid} ل.س</p>
                        <p className="mb-2"><strong>تاريخ انتهاء المزاد:</strong> {new Date(auctionDetails.endDate).toLocaleString()}</p>
                        <p className="mb-2"><strong>الوقت المتبقي:</strong> {remainingTime}</p>
                        <p className={`text-sm font-semibold ${auctionDetails.status === 'canceled' ? 'text-red-600' : auctionDetails.status === 'closed' ? 'text-gray-600' : 'text-green-600'}`}>
                            الحالة: {auctionDetails.status === 'canceled' ? 'ملغى' : auctionDetails.status === 'closed' ? 'مغلق' : 'نشط'}
                        </p>
                    </div>
                </div>

                {/* عمود العمليات في غرفة المزايدة */}
                <div className="flex-none w-1/2 border p-4 rounded-lg shadow-lg flex flex-col justify-between">
                    <div className="mb-4 text-center">
                        <h2 className="text-xl font-semibold">الخيارات المتاحة</h2>
                    </div>

                    {/* قسم الزرار ليكون في الأسفل دائمًا */}
                    <div className="mt-auto">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-2 hover:bg-blue-700 transition duration-200">
                            المزايدة الآن
                        </button>
                        <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded w-full mb-2 hover:bg-gray-400 transition duration-200">
                            عرض المزايدات السابقة
                        </button>
                        <button className="bg-red-500 text-white px-4 py-2 rounded w-full mb-2 hover:bg-red-700 transition duration-200">
                            إنهاء المزاد
                        </button>
                        <button onClick={() => window.location.reload()} className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-700 transition duration-200">
                            تحديث الصفحة
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuctionRoom;
