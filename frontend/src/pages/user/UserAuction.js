import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const UserAuction = () => {
    const [auctions, setAuctions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterCategory, setFilterCategory] = useState('all');
    const [sortOrder, setSortOrder] = useState('default');
    const [endDateFilter, setEndDateFilter] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAuctions = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/auction');
                if (!response.ok) {
                    throw new Error('Failed to fetch auctions');
                }
                const data = await response.json();
                setAuctions(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAuctions();
    }, []);

    const filteredAuctions = auctions.filter(auction => {
        const matchesSearch = auction.itemName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || auction.status === filterStatus;
        const matchesCategory = filterCategory === 'all' || auction.category === filterCategory;
        const matchesEndDate = !endDateFilter || new Date(auction.endDate) < new Date(endDateFilter);

        return matchesSearch && matchesStatus && matchesCategory && matchesEndDate;
    });

    const sortedAuctions = filteredAuctions.sort((a, b) => {
        switch (sortOrder) {
            case 'priceAsc':
                return a.startPrice - b.startPrice;
            case 'priceDesc':
                return b.startPrice - a.startPrice;
            case 'newest':
                return new Date(b.endDate) - new Date(a.endDate);
            case 'oldest':
                return new Date(a.endDate) - new Date(b.endDate);
            default:
                return 0;
        }
    });

    const resetFilters = () => {
        setSearchTerm('');
        setFilterStatus('all');
        setFilterCategory('all');
        setSortOrder('default');
        setEndDateFilter('');
    };

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center">Error: {error}</div>;
    }

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-center">المزادات</h1>

            <h2 className='text-right text-xl text-gray-600 mb-2'>:الفلترة</h2>
            <div className="flex flex-col gap-y-2 md:flex-row md:items-center md:justify-between gap-x-4 mb-4">
                <input
                    type="text"
                    placeholder="ابحث عن مزاد..."
                    className="p-2 border border-gray-300 rounded flex-1"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="flex flex-col gap-y-2 md:flex-row md:items-center md:space-x-4">
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                    >
                        <option value="all">جميع الحالات</option>
                        <option value="open">نشط</option>
                        <option value="canceled">ملغي</option>
                        <option value="closed">مغلق</option>
                    </select>
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                    >
                        <option value="all">جميع الفئات</option>
                        <option value="Metals">معادن</option>
                        <option value="Plastics">بلاستيك</option>
                        <option value="Electronics">إلكترونيات</option>
                        <option value="Paper and Cardboard">ورق وكرتون</option>
                        <option value="Furniture">أثاث</option>
                    </select>
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                    >
                        <option value="default">ترتيب افتراضي</option>
                        <option value="priceAsc">الأعلى بداية سعر أولا</option>
                        <option value="priceDesc">الأدنى بداية سعر أولا</option>
                        <option value="newest">الأحدث أولا</option>
                        <option value="oldest">الأقدم أولا</option>
                    </select>
                    <input
                        type="date"
                        value={endDateFilter}
                        onChange={(e) => setEndDateFilter(e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                    />
                </div>
                <button
                    onClick={resetFilters}
                    className="p-2 bg-green-500 hover:bg-green-600 transition-all duration-100 text-white rounded mt-2 md:mt-0 md:ml-2"
                >
                    إلغاء جميع الفلاتر
                </button>
            </div>


            {sortedAuctions.length === 0 ? (
                <div className="text-center text-gray-500 p-4 border border-gray-300 rounded-lg">
                    <p>لا توجد مزادات متاحة حالياً.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedAuctions.map(auction => (
                        <div
                            key={auction._id}
                            dir='rtl'
                            className={`border p-4 rounded-lg shadow-lg transition-all duration-300 
                                ${auction.status === 'canceled' ? 'bg-red-100 border-red-300' : auction.status === 'closed' ? 'bg-gray-100 border-gray-300' : 'bg-white hover:shadow-xl border-gray-300'}`}
                        >
                            <div className='mb-5'>
                                <Slider {...sliderSettings}>
                                    {auction.images.map((image, index) => (
                                        <div key={index}>
                                            <img src={image} alt={auction.itemName} className="w-full h-48 object-cover mb-2 rounded-lg" />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                            <h3 className="font-bold text-xl mb-2">{auction.itemName}</h3>
                            <p className="text-gray-700 mb-2">{auction.description}</p>
                            <p className="mb-1"><strong>الفئة:</strong> {auction.category}</p>
                            <p className="mb-1"><strong>سعر البداية:</strong> {auction.startPrice} ل.س</p>
                            <p className="mb-1"><strong>القيمة الحالية:</strong> {auction.currentBid} ل.س</p>
                            <p className="mb-2"><strong>تاريخ انتهاء المزاد:</strong> {new Date(auction.endDate).toLocaleString()}</p>
                            <p className={`text-sm font-semibold ${auction.status === 'canceled' ? 'text-red-600' : auction.status === 'closed' ? 'text-gray-600' : 'text-green-600'}`}>
                                الحالة: {auction.status === 'canceled' ? 'ملغى' : auction.status === 'closed' ? 'مغلق' : 'نشط'}
                            </p>
                            <button
                                onClick={auction.status === 'open' ? () => navigate(`/auction-room/${auction._id}`) : null}
                                disabled={auction.status !== 'open'}
                                className={`mt-4 w-full p-2 rounded transition duration-200 
                                    ${auction.status === 'open' ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
                            >
                                ادخل إلى غرفة المزاد
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserAuction;
