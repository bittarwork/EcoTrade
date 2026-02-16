import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import BiddersLeaderboard from '../../components/BiddersLeaderboard';
import AuctionStats from '../../components/AuctionStats';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
    SparklesIcon,
    TrendingUpIcon,
    UserIcon,
    ClockIcon,
    CheckCircleIcon,
    ExclamationIcon,
    ArrowLeftIcon,
    FireIcon,
    LightningBoltIcon,
} from '@heroicons/react/outline';

const AuctionRoom = () => {
    const { auctionId } = useParams();
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    
    // State management
    const [auctionDetails, setAuctionDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [remainingTime, setRemainingTime] = useState(null);
    const [remainingTimeStyle, setRemainingTimeStyle] = useState("text-black");
    const [percentageIncrease, setPercentageIncrease] = useState(5);
    const [bidStatus, setBidStatus] = useState(null);
    const [isPlacingBid, setIsPlacingBid] = useState(false);
    const [showBidSuccess, setShowBidSuccess] = useState(false);
    
    const bidSoundRef = useRef(null);
    const updateIntervalRef = useRef(null);

    // Fetch auction details on mount and set up auto-refresh
    useEffect(() => {
        fetchAuctionDetails();
        
        // Auto refresh every 5 seconds
        updateIntervalRef.current = setInterval(fetchAuctionDetails, 5000);

        return () => {
            if (updateIntervalRef.current) {
                clearInterval(updateIntervalRef.current);
            }
        };
    }, [auctionId]);

    // Fetch auction details from backend
    const fetchAuctionDetails = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/auction/${auctionId}`);
            
            if (!response.ok) {
                throw new Error(`فشل في جلب بيانات المزاد: ${response.statusText}`);
            }
            
            const data = await response.json();
            
            // Validate data structure
            if (!data || !data._id) {
                throw new Error('البيانات المستلمة غير صحيحة');
            }
            
            setAuctionDetails(data);
            calculateRemainingTime(data.endDate);
            setError(null);
        } catch (err) {
            console.error('Error fetching auction:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Calculate and update remaining time
    const calculateRemainingTime = (endDate) => {
        if (!endDate) {
            setRemainingTime("غير محدد");
            return;
        }

        const updateTimer = () => {
            const end = new Date(endDate).getTime();
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
                    ? `${days} يوم ${hours} ساعة ${minutes} دقيقة ${seconds} ثانية`
                    : `${hours} ساعة ${minutes} دقيقة ${seconds} ثانية`;

                setRemainingTime(formattedTime);

                // Change color based on remaining time
                if (distance <= 5 * 60 * 1000) { // Less than 5 minutes
                    setRemainingTimeStyle("text-red-600 animate-pulse");
                } else if (distance <= 60 * 60 * 1000) { // Less than 1 hour
                    setRemainingTimeStyle("text-orange-600");
                } else {
                    setRemainingTimeStyle("text-green-600");
                }
            }
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    };

    // Place bid with comprehensive validation
    const placeBid = async () => {
        // Validate user is logged in
        if (!user || !user.id) {
            setBidStatus({ success: false, message: 'يرجى تسجيل الدخول لتقديم عرض' });
            return;
        }

        // Validate percentage
        if (!percentageIncrease || percentageIncrease < 1) {
            setBidStatus({ success: false, message: 'يجب أن تكون نسبة الزيادة 1% على الأقل' });
            return;
        }

        if (percentageIncrease > 100) {
            setBidStatus({ success: false, message: 'نسبة الزيادة لا يمكن أن تتجاوز 100%' });
            return;
        }

        // Validate auction is still open
        if (!auctionDetails || auctionDetails.status !== 'open') {
            setBidStatus({ success: false, message: 'المزاد غير مفتوح للمزايدة' });
            return;
        }

        setIsPlacingBid(true);
        setBidStatus(null);

        try {
            const bidData = {
                auctionId: auctionId,
                bidderId: user.id,
                percentageIncrease: parseInt(percentageIncrease)
            };

            const response = await fetch(`${process.env.REACT_APP_API_URL}/auction/bid`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bidData)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || result.message || 'فشل في تقديم العرض');
            }

            // Show success animation
            setShowBidSuccess(true);
            setTimeout(() => setShowBidSuccess(false), 3000);

            // Play success sound if available
            if (bidSoundRef.current) {
                bidSoundRef.current.play().catch(() => {
                    // Ignore audio play errors
                });
            }

            setBidStatus({ success: true, message: 'تم تقديم عرضك بنجاح! 🎉' });
            
            // Refresh auction details immediately
            await fetchAuctionDetails();
            
        } catch (err) {
            console.error("خطأ أثناء تقديم العرض:", err);
            setBidStatus({ success: false, message: err.message || 'حدث خطأ أثناء تقديم العرض' });
        } finally {
            setIsPlacingBid(false);
        }
    };

    // Calculate new bid amount
    const calculateNewBid = () => {
        if (!auctionDetails) return 0;
        
        const baseBid = auctionDetails.currentBid === 0 || !auctionDetails.currentBid
            ? auctionDetails.startPrice 
            : auctionDetails.currentBid;
        
        const increase = baseBid * (percentageIncrease / 100);
        return Math.round(baseBid + increase);
    };

    // Slider settings
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        rtl: true,
    };

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-6">
                        <div className="absolute inset-0 border-4 border-green-200 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-green-600 rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <p className="text-2xl font-bold text-gray-700">جاري تحميل غرفة المزاد...</p>
                    <p className="text-sm text-gray-500 mt-2">يرجى الانتظار بينما نحضر كل شيء</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center p-6">
                <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ExclamationIcon className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">خطأ في تحميل المزاد</h2>
                    <p className="text-red-600 mb-6">{error}</p>
                    <button
                        onClick={() => navigate('/auctions')}
                        className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg"
                    >
                        العودة إلى المزادات
                    </button>
                </div>
            </div>
        );
    }

    if (!auctionDetails) return null;

    const isAuctionActive = auctionDetails.status === 'open' && new Date() < new Date(auctionDetails.endDate);
    const isCurrentUserHighestBidder = auctionDetails.currentBidder?._id === user?.id;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50" dir="rtl">
            {/* Success Confetti Effect */}
            {showBidSuccess && (
                <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
                    <div className="text-8xl animate-bounce">🎉</div>
                </div>
            )}

            {/* Audio for bid success */}
            <audio ref={bidSoundRef} src="/sounds/success.mp3" />

            {/* Hero Header */}
            <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-teal-500 to-blue-500 text-white">
                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-700"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-6 py-12">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate('/auctions')}
                        className="flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 mb-6"
                    >
                        <ArrowLeftIcon className="w-5 h-5 rotate-180" />
                        العودة إلى المزادات
                    </button>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                                {isAuctionActive ? (
                                    <>
                                        <FireIcon className="w-5 h-5 animate-pulse" />
                                        <span className="text-sm font-medium">مزاد مباشر</span>
                                    </>
                                ) : (
                                    <>
                                        <ClockIcon className="w-5 h-5" />
                                        <span className="text-sm font-medium">انتهى المزاد</span>
                                    </>
                                )}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-3">{auctionDetails.itemName || 'بدون اسم'}</h1>
                            <p className="text-xl text-green-50">{auctionDetails.category || 'غير محدد'}</p>
                        </div>

                        {/* Time Remaining Card */}
                        {isAuctionActive && (
                            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
                                <p className="text-sm text-green-50 mb-2">الوقت المتبقي</p>
                                <p className={`text-3xl font-bold ${remainingTimeStyle}`}>{remainingTime}</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Auction Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Images Carousel */}
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-gray-100">
                            {auctionDetails.images && auctionDetails.images.length > 0 ? (
                                <Slider {...sliderSettings}>
                                    {auctionDetails.images.map((image, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={image}
                                                alt={`${auctionDetails.itemName} - صورة ${index + 1}`}
                                                className="w-full h-96 object-cover"
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/800x400?text=No+Image';
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                                        </div>
                                    ))}
                                </Slider>
                            ) : (
                                <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                                    <p className="text-gray-500 text-lg">لا توجد صور متاحة</p>
                                </div>
                            )}
                        </div>

                        {/* Description Section */}
                        <div className="bg-white rounded-3xl shadow-xl p-6 border-2 border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <SparklesIcon className="w-6 h-6 text-green-600" />
                                الوصف
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                {auctionDetails.description || 'لا يوجد وصف متاح'}
                            </p>

                            {/* Additional Details Grid */}
                            {(auctionDetails.quantity || auctionDetails.location || auctionDetails.condition || auctionDetails.weight) && (
                                <div className="mt-6 grid grid-cols-2 gap-4">
                                    {auctionDetails.quantity && (
                                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4">
                                            <p className="text-xs text-gray-600 mb-1">الكمية</p>
                                            <p className="font-bold text-gray-800">{auctionDetails.quantity}</p>
                                        </div>
                                    )}
                                    {auctionDetails.location && (
                                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4">
                                            <p className="text-xs text-gray-600 mb-1">الموقع</p>
                                            <p className="font-bold text-gray-800">{auctionDetails.location}</p>
                                        </div>
                                    )}
                                    {auctionDetails.condition && (
                                        <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-4">
                                            <p className="text-xs text-gray-600 mb-1">الحالة</p>
                                            <p className="font-bold text-gray-800">{auctionDetails.condition}</p>
                                        </div>
                                    )}
                                    {auctionDetails.weight && (
                                        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4">
                                            <p className="text-xs text-gray-600 mb-1">الوزن</p>
                                            <p className="font-bold text-gray-800">{auctionDetails.weight}</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Specifications */}
                            {auctionDetails.specifications && (
                                <div className="mt-4 bg-gray-50 rounded-xl p-4">
                                    <p className="text-sm font-semibold text-gray-700 mb-2">المواصفات:</p>
                                    <p className="text-gray-600 text-sm">{auctionDetails.specifications}</p>
                                </div>
                            )}
                        </div>

                        {/* Current Bid Section */}
                        <div className="bg-gradient-to-br from-green-500 to-teal-500 rounded-3xl shadow-2xl p-8 text-white">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <p className="text-green-100 text-sm mb-1">سعر البداية</p>
                                    <p className="text-2xl font-bold">
                                        {(auctionDetails.startPrice || 0).toLocaleString('ar-SY')} €
                                    </p>
                                </div>
                                <TrendingUpIcon className="w-12 h-12 text-white/30" />
                            </div>

                            {/* Current Highest Bid */}
                            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-6">
                                <p className="text-green-100 text-sm mb-2">العرض الأعلى الحالي</p>
                                <p className="text-5xl font-bold mb-4">
                                    {(auctionDetails.currentBid || 0).toLocaleString('ar-SY')} €
                                </p>
                                
                                {/* Current Bidder Info */}
                                {auctionDetails.currentBidder && (
                                    <div className="flex items-center gap-3">
                                        {auctionDetails.currentBidder.profileImage ? (
                                            <img
                                                src={auctionDetails.currentBidder.profileImage}
                                                alt={auctionDetails.currentBidder.name}
                                                className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                                <UserIcon className="w-6 h-6 text-green-600" />
                                            </div>
                                        )}
                                        <div>
                                            <p className="font-semibold">{auctionDetails.currentBidder.name || 'مستخدم'}</p>
                                            {isCurrentUserHighestBidder && (
                                                <span className="text-xs bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full font-bold">
                                                    أنت الأعلى عرضاً! 🏆
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Place Bid Section */}
                            {isAuctionActive ? (
                                <div className="space-y-4">
                                    <div className="bg-white rounded-2xl p-6">
                                        <label className="block text-gray-700 font-semibold mb-3">
                                            زيادة العرض بنسبة (%)
                                        </label>
                                        
                                        {/* Quick Percentage Buttons */}
                                        <div className="grid grid-cols-5 gap-2 mb-4">
                                            {[5, 10, 15, 20, 25].map((percent) => (
                                                <button
                                                    key={percent}
                                                    onClick={() => setPercentageIncrease(percent)}
                                                    className={`py-2 rounded-lg font-bold transition-all ${
                                                        percentageIncrease === percent
                                                            ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-lg scale-105'
                                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                                >
                                                    {percent}%
                                                </button>
                                            ))}
                                        </div>

                                        {/* Custom Percentage Input */}
                                        <input
                                            type="number"
                                            min="1"
                                            max="100"
                                            value={percentageIncrease}
                                            onChange={(e) => setPercentageIncrease(e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 font-semibold text-center text-lg"
                                            placeholder="نسبة مخصصة %"
                                        />

                                        {/* New Bid Preview */}
                                        <div className="mt-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
                                            <p className="text-sm text-gray-600 mb-1">عرضك الجديد سيكون:</p>
                                            <p className="text-3xl font-bold text-green-600">
                                                {calculateNewBid().toLocaleString('ar-SY')} €
                                            </p>
                                        </div>
                                    </div>

                                    {/* Place Bid Button */}
                                    <button
                                        onClick={placeBid}
                                        disabled={isPlacingBid || !user}
                                        className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                                            isPlacingBid || !user
                                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                : 'bg-white text-green-600 hover:bg-green-50 shadow-lg hover:shadow-xl hover:scale-105'
                                        }`}
                                    >
                                        {isPlacingBid ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                                                جاري تقديم العرض...
                                            </>
                                        ) : !user ? (
                                            'يجب تسجيل الدخول للمزايدة'
                                        ) : (
                                            <>
                                                <LightningBoltIcon className="w-6 h-6" />
                                                قدم عرضك الآن
                                            </>
                                        )}
                                    </button>

                                    {/* Bid Status Message */}
                                    {bidStatus && (
                                        <div className={`rounded-xl p-4 flex items-center gap-3 animate-slide-down ${
                                            bidStatus.success
                                                ? 'bg-green-100 text-green-800 border-2 border-green-300'
                                                : 'bg-red-100 text-red-800 border-2 border-red-300'
                                        }`}>
                                            {bidStatus.success ? (
                                                <CheckCircleIcon className="w-6 h-6 flex-shrink-0" />
                                            ) : (
                                                <ExclamationIcon className="w-6 h-6 flex-shrink-0" />
                                            )}
                                            <p className="font-semibold">{bidStatus.message}</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
                                    <p className="text-lg font-bold">انتهى المزاد</p>
                                    {auctionDetails.winner && (
                                        <p className="text-sm mt-2">
                                            الفائز: <span className="font-bold">{auctionDetails.winner.name || 'غير معروف'}</span>
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Bidders Leaderboard */}
                        <BiddersLeaderboard bids={auctionDetails.bids || []} currentUserId={user?.id} />
                    </div>

                    {/* Right Column - Stats & Info */}
                    <div className="space-y-6">
                        {/* Auction Statistics */}
                        <AuctionStats auction={auctionDetails} />
                        
                        {/* Auction Information Card */}
                        <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-gray-100">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">معلومات المزاد</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">تاريخ الإنشاء:</span>
                                    <span className="font-semibold text-gray-800">
                                        {new Date(auctionDetails.createdAt).toLocaleDateString('ar-SY')}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">تاريخ الانتهاء:</span>
                                    <span className="font-semibold text-gray-800">
                                        {new Date(auctionDetails.endDate).toLocaleDateString('ar-SY')}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">الحالة:</span>
                                    <span className={`font-bold ${
                                        auctionDetails.status === 'open' ? 'text-green-600' :
                                        auctionDetails.status === 'closed' ? 'text-gray-600' : 'text-red-600'
                                    }`}>
                                        {auctionDetails.status === 'open' ? 'نشط' :
                                         auctionDetails.status === 'closed' ? 'مغلق' : 'ملغي'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuctionRoom;
