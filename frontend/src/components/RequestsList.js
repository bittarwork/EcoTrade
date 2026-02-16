import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
};

// Request id from API: user requests use "id", grouped use "_id"
const getRequestId = (request) => request.id || request._id;

const RequestsList = ({ requests, onUpdateStatus, userRole }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" dir="rtl">
            {requests.map((request) => {
                const requestId = getRequestId(request);
                const isCompleted = request.status === 'completed';
                const isCanceled = request.status === 'canceled';
                const statusLabel = isCompleted ? 'مكتمل' : isCanceled ? 'ملغي' : 'قيد الانتظار';

                return (
                    <div
                        key={requestId}
                        className={`rounded-xl border p-4 transition-all duration-200 ${
                            isCanceled ? 'bg-red-50/50 border-red-200' : isCompleted ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200 hover:shadow-md'
                        }`}
                    >
                        <div className="mb-4 overflow-hidden rounded-lg">
                            <Slider {...sliderSettings}>
                                {request.images && request.images.length > 0 ? request.images.map((image, index) => (
                                    <div key={index}>
                                        <img src={image} alt={`طلب ${index + 1}`} className="w-full h-44 object-cover" />
                                    </div>
                                )) : (
                                    <div className="w-full h-44 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">لا توجد صور</div>
                                )}
                            </Slider>
                        </div>
                        <div className="flex justify-between items-start gap-2 mb-3">
                            <h3 className="text-base font-semibold text-gray-800 line-clamp-2">{request.address}</h3>
                            <span className={`shrink-0 text-xs font-semibold py-1 px-2 rounded-full ${isCompleted ? 'bg-green-100 text-green-800' : isCanceled ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}`}>
                                {statusLabel}
                            </span>
                        </div>

                        <div className="text-sm text-gray-600 space-y-1 mb-4">
                            <p><strong className="text-gray-700">نوع الخردة:</strong> {request.scrapType}</p>
                            <p><strong className="text-gray-700">التاريخ:</strong> {new Date(request.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                        </div>

                        {userRole === 'admin' && (
                            <button
                                type="button"
                                onClick={() => onUpdateStatus(requestId, 'completed')}
                                disabled={isCompleted}
                                className={`w-full py-2 rounded-lg text-sm font-medium transition ${isCompleted ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
                            >
                                {isCompleted ? 'مكتمل' : 'تأكيد الإكمال'}
                            </button>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default RequestsList;
