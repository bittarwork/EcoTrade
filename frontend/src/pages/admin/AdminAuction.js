import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import AuctionPopup from '../../models/AuctionPopup';
import { Link } from 'react-router-dom';
import AuctionStatitics from '../../components/AuctionStatitics';
const AdminAuction = () => {
    const [auctions, setAuctions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [newAuction, setNewAuction] = useState({
        itemName: '',
        description: '',
        category: 'Metals',
        startPrice: '',
        endDate: '',
        images: []
    });
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        fetchAuctions();
    }, []);

    const fetchAuctions = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/auction`);
            setAuctions(response.data);
        } catch (error) {
            console.error("Error fetching auctions:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewAuction({ ...newAuction, [name]: value });
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setNewAuction({ ...newAuction, images: files });
    };

    const createAuction = async () => {
        const formData = new FormData();
        Object.keys(newAuction).forEach(key => {
            if (key === 'images') {
                newAuction.images.forEach(image => {
                    formData.append('images', image);
                });
            } else {
                formData.append(key, newAuction[key]);
            }
        });

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/auction`, formData);
            fetchAuctions();
            setNewAuction({
                itemName: '',
                description: '',
                category: 'Metals',
                startPrice: '',
                endDate: '',
                images: []
            });
            closePopup();
        } catch (error) {
            console.error("Error creating auction:", error);
        }
    };

    const cancelAuction = async (auctionId) => {
        const updatedAuctions = auctions.map(auction => {
            if (auction._id === auctionId) {
                return { ...auction, status: 'canceled' };
            }
            return auction;
        });
        setAuctions(updatedAuctions);

        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/auction/cancel/${auctionId}`);
        } catch (error) {
            console.error("Error cancelling auction:", error);
        }
    };

    const closeAuction = async (auctionId) => {
        const updatedAuctions = auctions.map(auction => {
            if (auction._id === auctionId) {
                return { ...auction, status: 'closed' };
            }
            return auction;
        });
        setAuctions(updatedAuctions);

        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/auction/close/${auctionId}`);
        } catch (error) {
            console.error("Error closing auction:", error);
        }
    };

    const deleteAuction = async (auctionId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/auction/${auctionId}`);
            fetchAuctions();
        } catch (error) {
            console.error("Error deleting auction:", error);
        }
    };

    const openPopup = () => setShowPopup(true);
    const closePopup = () => setShowPopup(false);

    const filteredAuctions = auctions.filter(auction =>
        auction.itemName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };


    const AuctionCard = ({ auction, onCancel, onClose, onDelete }) => (
        <div className={`border p-4 rounded-lg shadow-lg transition-all duration-300 
                ${auction.status === 'canceled' ? 'bg-red-100' : auction.status === 'closed' ? 'bg-gray-100' : 'bg-white hover:shadow-xl'}`} dir='rtl' >
            <div className='mb-5'>
                <Slider {...settings}>
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
            <p className="mb-1"><strong>العطاء الحالي:</strong> {auction.currentBid} ل.س</p>
            <p className="mb-2"><strong>تاريخ انتهاء المزاد:</strong> {new Date(auction.endDate).toLocaleString()}</p>
            <p className={`text-sm font-semibold ${auction.status === 'canceled' ? 'text-red-600' : auction.status === 'closed' ? 'text-gray-600' : 'text-green-600'}`}>
                الحالة: {auction.status === 'canceled' ? 'ملغى' : auction.status === 'closed' ? 'مغلق' : 'نشط'}
            </p>
            <div className='h-0.5 w-full bg-black bg-opacity-10 mt-2'></div>
            <div className="flex justify-between mt-4">
                <button className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition duration-200" onClick={() => onCancel(auction._id)}>
                    إلغاء المزاد
                </button>
                <button className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition duration-200" onClick={() => onClose(auction._id)}>
                    إغلاق المزاد
                </button>
                <button className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition duration-200" onClick={() => onDelete(auction._id)}>
                    حذف المزاد
                </button>
            </div>
            {/* زر الانتقال إلى تفاصيل المزاد */}
            <Link to={`/auction-room-admin/${auction._id}`} className="block mt-4 p-2 text-center bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200 w-full">
                عرض تفاصيل المزاد
            </Link>
        </div>
    );
    return (
        <div className="p-6 bg-gray-50">
            <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">إدارة المزادات</h1>
            <AuctionStatitics auctions={auctions}></AuctionStatitics>
            <div className="flex justify-between mb-4">
                <div className="flex-grow mr-2">
                    <input
                        type="text"
                        placeholder="ابحث حسب الاسم"
                        className="border border-gray-300 rounded-lg p-3 w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button
                    onClick={openPopup}
                    className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition duration-200">
                    إضافة مزاد جديد
                </button>
            </div>

            {showPopup && (
                <AuctionPopup
                    newAuction={newAuction}
                    handleChange={handleChange}
                    handleImageUpload={handleImageUpload}
                    createAuction={createAuction}
                    closePopup={closePopup}
                />
            )}

            {filteredAuctions.length === 0 ? (
                <div className="text-center text-gray-500 p-4 border border-gray-300 rounded-lg">
                    <p>لا توجد مزادات متاحة حالياً.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAuctions.map(auction => (
                        <AuctionCard
                            key={auction._id}
                            auction={auction}
                            onCancel={cancelAuction}
                            onClose={closeAuction}
                            onDelete={deleteAuction}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminAuction;
