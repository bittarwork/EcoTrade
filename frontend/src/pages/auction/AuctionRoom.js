import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import UserContext from '../../context/UserContext';

const AuctionRoom = () => {
    const { auctionId } = useParams();
    const { user } = useContext(UserContext);
    const [auctionDetails, setAuctionDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [remainingTime, setRemainingTime] = useState(null);
    const [remainingTimeStyle, setRemainingTimeStyle] = useState("text-black");
    const [percentageIncrease, setPercentageIncrease] = useState(0);
    const [bidStatus, setBidStatus] = useState(null);
    const [lastBidderInfo, setLastBidderInfo] = useState(null);

    useEffect(() => {
        const fetchAuctionDetails = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/auction/${auctionId}`);
                if (!response.ok) {
                    throw new Error(`فشل في جلب بيانات المزاد: ${response.statusText}`);
                }
                const data = await response.json();
                setAuctionDetails(data);
                calculateRemainingTime(data.endDate);
                if (data.bids.length > 0) {
                    await fetchLastBidder(data.bids[data.bids.length - 1].bidder);
                }
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
                    setRemainingTimeStyle("text-gray-600");
                } else {
                    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
                    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
                    const seconds = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');

                    const formattedTime = days > 0
                        ? `${days} يوم ${hours}س ${minutes}د ${seconds}ث`
                        : `${hours}س ${minutes}د ${seconds}ث`;

                    setRemainingTime(formattedTime);

                    if (distance <= 5 * 60 * 1000) {
                        setRemainingTimeStyle("text-red-600");
                    } else if (distance <= 60 * 60 * 1000) {
                        setRemainingTimeStyle("text-red-600");
                    } else {
                        setRemainingTimeStyle("text-black");
                    }
                }
            };
            updateTimer();
            const interval = setInterval(updateTimer, 1000);
            return () => clearInterval(interval);
        };

        const fetchLastBidder = async (bidderId) => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/users/profile/${bidderId}`);
                if (!response.ok) {
                    throw new Error(`فشل في جلب بيانات المزايد: ${response.statusText}`);
                }
                const data = await response.json();
                setLastBidderInfo(data.user);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchAuctionDetails();
        const intervalId = setInterval(fetchAuctionDetails, 100);

        return () => clearInterval(intervalId);
    }, [auctionId]);

    const placeBid = async () => {
        try {
            const bidData = {
                auctionId: auctionId,
                bidderId: user.id,
                percentageIncrease: parseInt(percentageIncrease)
            };

            console.log("بيانات المزايدة المرسلة:", bidData);

            const response = await fetch(`${process.env.REACT_APP_API_URL}/auction/bid`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bidData)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`خطأ في المزايدة: ${errorText}`);
            }

            const result = await response.json();
            setBidStatus({ success: true, message: "تم تقديم المزايدة بنجاح!" });
        } catch (err) {
            console.error("خطأ أثناء تقديم الطلب:", err.message);
            setBidStatus({ success: false, message: err.message });
        }
    };

    if (loading) return <div className="text-center">جارٍ تحميل البيانات...</div>;
    if (error) return <div className="text-red-500 text-center">خطأ: {error}</div>;
    if (!auctionDetails) return null;

    return (
        <div className="flex flex-col min-h-screen">
            <div className="container mx-auto flex flex-row w-full">
                <div className="flex-1 mr-4 w-1/2">
                    <div
                        dir='rtl'
                        className={`border p-4 rounded-lg shadow-lg transition-all duration-300 
                            ${auctionDetails.status === 'canceled' ? 'bg-red-100 border-red-300' : auctionDetails.status === 'closed' ? 'bg-gray-100 border-gray-300' : 'bg-white border-gray-300'}`}
                    >
                        <h1 className="font-bold text-3xl mb-4 text-center">غرفة المزاد - {auctionDetails.itemName}</h1>

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
                        <p className={`mb-2 ${remainingTimeStyle}`}>
                            <strong>الوقت المتبقي:</strong> {remainingTime}
                        </p>
                        <p className={`text-sm font-semibold ${auctionDetails.status === 'canceled' ? 'text-red-600' : auctionDetails.status === 'closed' ? 'text-gray-600' : 'text-green-600'}`}>
                            الحالة: {auctionDetails.status === 'canceled' ? 'ملغى' : auctionDetails.status === 'closed' ? 'مغلق' : 'نشط'}
                        </p>
                    </div>
                </div>

                <div className="flex-none w-1/2 border p-4 rounded-lg shadow-lg flex flex-col justify-between">
                    <div className="mb-4 text-center">
                        <h2 className="text-xl font-semibold">: أخر مزايدة ومعلوماتها</h2>
                    </div>

                    {lastBidderInfo && (
                        <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden mb-4">
                            <div className="flex items-center p-4 border-b border-gray-200">
                                <img
                                    src={lastBidderInfo.profileImage}
                                    alt={lastBidderInfo.name}
                                    className="w-24 h-24 rounded-full border-2 border-green-500"
                                />
                                <div className="ml-4">
                                    <h3 className="text-xl font-bold text-gray-800">{lastBidderInfo.name}</h3>
                                    <p className="text-sm text-gray-500">{lastBidderInfo.email}</p>
                                </div>
                            </div>
                            <div className="p-4">
                                <p className="text-lg font-semibold text-green-600">
                                    قيمة المزايدة: {Math.round(auctionDetails.bids[auctionDetails.bids.length - 1].bidAmount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '')} ل.س
                                </p>
                            </div>
                        </div>
                    )}



                    <div className="mt-auto">
                        <input
                            type="number"
                            className="border rounded px-4 py-2 mb-4 w-full"
                            placeholder="أدخل نسبة الزيادة"
                            value={percentageIncrease}
                            onChange={(e) => setPercentageIncrease(e.target.value)}
                        />
                        <button
                            onClick={placeBid}
                            className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-2 hover:bg-blue-700 transition duration-200"
                        >
                            قدم مزايدتك
                        </button>
                        {bidStatus && (
                            <p className={`text-center ${bidStatus.success ? 'text-green-600' : 'text-red-600'}`}>
                                {bidStatus.message}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuctionRoom;
