import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// تسجيل المكونات اللازمة لـ Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const GroupedRequestsList = ({ groupedRequests, onUpdateStatus, onDeleteRequest, onCancelRequest, userRole }) => {
    // حساب الإحصائيات
    const totalRequests = groupedRequests.reduce((acc, group) => acc + group.requests.length, 0);
    const completedRequests = groupedRequests.reduce((acc, group) =>
        acc + group.requests.filter(request => request.status === 'completed').length,
        0
    );
    const pendingRequests = totalRequests - completedRequests;
    const canceledRequests = groupedRequests.reduce((acc, group) =>
        acc + group.requests.filter(request => request.status === 'canceled').length,
        0
    );


    // بيانات الرسم البياني
    const pieChartData = {
        labels: ['الطلبات المكتملة', 'الطلبات غير المكتملة', 'الطلبات الملغاة'],
        datasets: [
            {
                data: [completedRequests, pendingRequests, canceledRequests],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 206, 86, 0.6)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 206, 86, 1)'],
                borderWidth: 1,
            },
        ],
    };

    const pieChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const label = tooltipItem.label || '';
                        const value = tooltipItem.raw;
                        const total = completedRequests + pendingRequests + canceledRequests;
                        const percentage = ((value / total) * 100).toFixed(2);
                        return `${label}: ${value} (${percentage}%)`;
                    },
                },
            },
        },
    };

    const [visibleRequests, setVisibleRequests] = useState(5); // عدد الطلبات المرئية في البداية

    const handleShowMore = () => {
        setVisibleRequests(prev => prev + 5); // زيادة عدد الطلبات المرئية
    };

    return (
        <div className="container mx-auto py-8" dir='rtl'>
            <div className="mb-8 p-6 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg shadow-md">
                <h3 className="text-xl text-center font-semibold text-gray-800">الإحصائيات:</h3>
                <p>إجمالي الطلبات: {totalRequests}</p>
                <p>الطلبات المكتملة: {completedRequests} ({((completedRequests / totalRequests) * 100).toFixed(2)}%)</p>
                <p>الطلبات غير المكتملة: {pendingRequests} ({((pendingRequests / totalRequests) * 100).toFixed(2)}%)</p>
                <p>الطلبات الملغاة: {canceledRequests} ({((canceledRequests / totalRequests) * 100).toFixed(2)}%)</p>
                <div className="bg-white p-4 rounded-lg mb-4 w-64 mx-auto shadow-lg">
                    <Pie data={pieChartData} options={pieChartOptions} />
                </div>
                <p className="text-center text-sm text-gray-600">نسبة الطلبات المكتملة وغير المكتملة والملغاة</p>
            </div>

            <div className='h-0.5 min-w-full bg-gray-300 mb-4'></div>
            <h2 className='text-2xl font-bold text-center mb-2'>الطلبات</h2>
            {groupedRequests.slice(0, visibleRequests).map((group, index) => (
                <div key={index} className=" border border-gray-400 p-6 rounded-lg   mb-4 ">

                    <div className="flex items-center mb-4">
                        <img
                            src={group.user.profileImage}
                            alt={group.user.name}
                            className="h-20 w-20 m-3 object-cover rounded-full border-2 border-gray-300 mr-4"
                        />
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-800">{group.user.name}</h3>
                            <p className="text-gray-600 text-md">{group.user.email}</p>
                            <span className={`text-xs  font-semibold py-1 px-2 rounded-full mt-2 ${group.user.role === 'admin' ? 'bg-red-200 text-red-800' : 'bg-blue-200 text-blue-800'}`}>
                                {group.user.role}
                            </span>
                        </div>
                    </div>

                    <div className="">
                        {group.requests.map((request) => {
                            const isCompleted = request.status === 'completed';
                            const isCanceled = request.status === 'canceled';

                            return (
                                <div key={request._id} className="mb-4 p-4 bg-gray-50 rounded-lg shadow-sm transition duration-200 hover:shadow-md border border-gray-200">
                                    <div className="flex justify-between items-center">
                                        <h4 className="text-lg font-semibold text-gray-800">{request.address}</h4>
                                        <span className={`text-md font-semibold py-1 px-2 rounded-full ${isCompleted ? 'bg-green-200 text-green-800' : isCanceled ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'}`}>
                                            {request.status}
                                        </span>
                                    </div>

                                    <div className="mt-2">
                                        <div className="flex flex-col space-y-1">
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
                                                <img
                                                    key={index}
                                                    src={image}
                                                    alt={`صورة ${index + 1}`}
                                                    className="h-20 w-20 object-cover rounded border border-gray-200"
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex mt-4">
                                        <button
                                            onClick={() => onUpdateStatus(request._id, 'completed')}
                                            className={`bg-${isCompleted ? 'red' : 'green'}-500 text-white px-4 py-2 rounded hover:bg-${isCompleted ? 'red' : 'green'}-600 transition duration-200 shadow ${isCompleted ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            disabled={isCompleted}
                                        >
                                            {isCompleted ? 'اكتمل' : 'أكمل'}
                                        </button>
                                        <button
                                            onClick={() => onDeleteRequest(request._id)}
                                            className="bg-red-500 mx-5 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200 shadow"
                                        >
                                            حذف
                                        </button>
                                        <button
                                            onClick={() => onCancelRequest(request._id)}
                                            className={`bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-200 shadow ${isCanceled ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            disabled={isCanceled}
                                        >
                                            {isCanceled ? 'ملغي' : 'إلغاء'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}

            {visibleRequests < groupedRequests.length && (
                <div className="text-center">
                    <button
                        onClick={handleShowMore}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                    >
                        عرض المزيد
                    </button>
                </div>
            )}
        </div>
    );
};

export default GroupedRequestsList;
