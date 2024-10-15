import React from 'react';

const RequestsList = ({ requests, onUpdateStatus, userRole }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" dir=''>
            {requests.map((request) => {
                const isCompleted = request.status === 'completed';

                return (
                    <div key={request._id} className=" bg-white p-4 rounded-lg shadow-lg transition duration-200 " dir='rtl'>
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-semibold text-gray-800">{request.address}</h3>
                            <span className={`text-sm font-semibold py-1 px-2 rounded-full ${isCompleted ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                                {request.status}
                            </span>
                        </div>

                        <div className="mt-2">
                            <h4 className="text-lg font-semibold text-gray-700">تفاصيل الطلب</h4>
                            <div className="flex flex-col space-y-1 mt-1">
                                <div className="flex items-center">
                                    <span className="font-medium text-gray-600 w-1/3">نوع الخردة:</span>
                                    <span className="text-gray-800">{request.scrapType}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-medium text-gray-600 w-1/3">تاريخ الإنشاء:</span>
                                    <span className="text-gray-800">{new Date(request.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4">
                            <h4 className="text-lg font-semibold text-gray-700">الصور</h4>
                            <div className="flex flex-wrap space-x-2 mt-2">
                                {request.images.map((image, index) => (
                                    <img key={index} src={image} alt={`Request ${request._id}`} className="h-20 w-20 object-cover rounded-lg border border-gray-200 shadow-sm transition-shadow duration-200 hover:shadow-md" />
                                ))}
                            </div>
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
