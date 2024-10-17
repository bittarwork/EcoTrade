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

const RequestsList = ({ requests, onUpdateStatus, userRole }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((request) => {
                const isCompleted = request.status === 'completed';
                const isCanceled = request.status === 'canceled';

                return (
                    <div
                        key={request._id}
                        dir='rtl'
                        className={`border p-4 rounded-lg shadow-lg transition-all duration-300 
                            ${isCanceled ? 'bg-red-100 border-red-300' : isCompleted ? 'bg-gray-100 border-gray-300' : 'bg-white hover:shadow-xl border-gray-300'}`}
                    >
                        <div className="mb-5">
                            <Slider {...sliderSettings}>
                                {request.images.map((image, index) => (
                                    <div key={index}>
                                        <img src={image} alt={`Request ${request._id}`} className="w-full h-48 object-cover mb-2 rounded-lg" />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-xl font-semibold text-gray-800">{request.address}</h3>
                            <span className={`text-sm font-semibold py-1 px-2 rounded-full ${isCompleted ? 'bg-green-200 text-green-800' : isCanceled ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'}`}>
                                {isCompleted ? 'مكتمل' : isCanceled ? 'ملغى' : 'نشط'}
                            </span>
                        </div>

                        <div className="text-gray-700 mb-4">
                            <h4 className="text-lg font-semibold">تفاصيل الطلب</h4>
                            <p><strong>نوع الخردة:</strong> {request.scrapType}</p>
                            <p><strong>تاريخ الإنشاء:</strong> {new Date(request.createdAt).toLocaleDateString()}</p>
                        </div>

                        {userRole === 'admin' && (
                            <div className="mt-4">
                                <button
                                    onClick={() => onUpdateStatus(request._id, 'completed')}
                                    className={`w-full px-4 py-2 rounded-lg transition duration-200 ${isCompleted ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50'}`}
                                    disabled={isCompleted}
                                >
                                    {isCompleted ? 'مكتمل' : 'تغيير الحالة إلى مكتمل'}
                                </button>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default RequestsList;
