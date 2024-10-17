import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const AdminAuctionRoom = () => {
    const { auctionId } = useParams();
    const [auction, setAuction] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [biddersInfo, setBiddersInfo] = useState({});

    useEffect(() => {
        const fetchAuctionDetails = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/auction/${auctionId}`);
                if (!response.ok) {
                    throw new Error('فشل في جلب بيانات المزاد');
                }
                const data = await response.json();
                setAuction(data);

                // جلب معلومات المزايدين
                const bidders = data.bids.map(bid => fetch(`http://localhost:5000/api/users/profile/${bid.bidder}`));
                const responses = await Promise.all(bidders);
                const biddersData = await Promise.all(responses.map(res => res.json()));

                // تخزين معلومات المزايدين
                const biddersInfoMap = {};
                biddersData.forEach((userData, index) => {
                    biddersInfoMap[data.bids[index].bidder] = userData.user;
                });
                setBiddersInfo(biddersInfoMap);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAuctionDetails();
    }, [auctionId]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    if (loading) {
        return <div className="text-center py-10">جاري تحميل بيانات المزاد...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center py-10">خطأ: {error}</div>;
    }

    const lastBid = auction.bids && auction.bids.length > 0 ? auction.bids[auction.bids.length - 1] : null; // آخر مزايد
    const lastBidderInfo = lastBid ? biddersInfo[lastBid.bidder] : null; // معلومات آخر مزايد

    return (
        <div className="container mx-auto" dir='rtl'>

            {/* قسم الوصف */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-5">
                {/* قسم السلايدر للصور */}
                <div className='mb-10'>
                    <Slider {...settings}>
                        {auction.images.map((image, index) => (
                            <div key={index}>
                                <img src={image} alt={auction.itemName} className="w-full h-64 object-contain mb-2 rounded-lg" />
                            </div>
                        ))}
                    </Slider>
                </div>
                <h3 className="text-xl font-semibold mb-2">الوصف</h3>
                <p className="text-gray-700 mb-4">{auction.description}</p>

                <div className="border-t border-gray-300 my-4"></div>

                <h3 className="text-lg mb-2 font-semibold">تفاصيل المزاد</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                        <i className="fas fa-tag text-gray-600 ml-2"></i>
                        <span className="font-medium"><strong>الفئة:</strong> {auction.category}</span>
                    </div>
                    <div className="flex items-center">
                        <i className="fas fa-money-bill-wave text-gray-600 ml-2"></i>
                        <span className="font-medium"><strong>سعر البداية:</strong> {auction.startPrice} ل.س</span>
                    </div>
                    <div className="flex items-center">
                        <i className="fas fa-gavel text-gray-600 ml-2"></i>
                        <span className="font-medium"><strong>العطاء الحالي:</strong> {auction.currentBid} ل.س</span>
                    </div>
                    <div className="flex items-center">
                        <i className="fas fa-clock text-gray-600 ml-2"></i>
                        <span className="font-medium"><strong>تاريخ انتهاء المزاد:</strong> {new Date(auction.endDate).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center">
                        <i className="fas fa-info-circle text-gray-600 ml-2"></i>
                        <span className="font-medium"><strong>الحالة:</strong> {auction.status}</span>
                    </div>
                </div>
            </div>

            {/* قسم المزايدات */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-5">
                <h3 className="text-xl font-semibold mb-2">آخر مزايد</h3>
                {lastBidderInfo ? (
                    <div className={`border p-6 rounded-lg mb-4 shadow-md ${auction.status === 'مغلق' ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-white'}`}>
                        <div className="flex items-start mb-4">
                            <img
                                src={lastBidderInfo.profileImage}
                                alt={lastBidderInfo.name}
                                className="w-20 h-20 rounded-full border-2 border-blue-400 ml-4"
                            />
                            <div>
                                <h4 className="text-xl mb-2 mt-3 font-semibold text-gray-800">{lastBidderInfo.name}</h4>
                                <p className="text-gray-500">{lastBidderInfo.email}</p>
                            </div>
                        </div>
                        <p className="text-gray-700 mt-2 text-lg">
                            <strong>مبلغ العطاء:</strong> {lastBid.bidAmount} ل.س
                        </p>
                        {auction.status === 'مغلق' && (
                            <div className="mt-4">
                                <p className="text-green-600 font-semibold">الفائز بالمزاد!</p>
                                <a
                                    href={`mailto:${lastBidderInfo.email}?subject=استفسار حول المزاد ${auctionId}`}
                                    className="mt-2 bg-blue-500 text-white rounded px-4 py-2 text-center inline-block hover:bg-blue-600 transition duration-200"
                                >
                                    تواصل مع الفائز
                                </a>
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="text-gray-500">لا توجد معلومات عن آخر مزايد.</p>
                )}

                <h3 className="text-xl font-semibold mb-2">المزايدات السابقة</h3>
                {Array.isArray(auction.bids) && auction.bids.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {auction.bids.slice(0, -1).map((bid, index) => (
                            <div key={index} className="border border-gray-300 rounded-lg p-4 mb-4">
                                <div className="flex items-center">
                                    <img
                                        src={biddersInfo[bid.bidder]?.profileImage}
                                        alt={biddersInfo[bid.bidder]?.name || 'مزايد غير معروف'}
                                        className="w-10 h-10 rounded-full mr-2"
                                    />
                                    <div>
                                        <strong>{biddersInfo[bid.bidder]?.name || bid.bidder}</strong>
                                        <p className="text-gray-500">{biddersInfo[bid.bidder]?.email || 'البريد الإلكتروني غير متوفر'}</p>
                                    </div>
                                </div>
                                <p className="text-gray-700 mt-2"><strong>مبلغ العطاء:</strong> {bid.bidAmount} ل.س</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 p-5">لا توجد مزايدات حالياً.</p>
                )}
            </div>
        </div>
    );
};

export default AdminAuctionRoom;
