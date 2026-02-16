import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// تسجيل المكونات اللازمة لـ Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const GroupedRequestsList = ({ groupedRequests, onUpdateStatus, onDeleteRequest, onCancelRequest, userRole }) => {
    // Stats: total, completed, pending (only status === 'pending'), canceled
    const totalRequests = groupedRequests.reduce((acc, group) => acc + group.requests.length, 0);
    const completedRequests = groupedRequests.reduce((acc, group) =>
        acc + group.requests.filter(r => r.status === 'completed').length,
        0
    );
    const canceledRequests = groupedRequests.reduce((acc, group) =>
        acc + group.requests.filter(r => r.status === 'canceled').length,
        0
    );
    const pendingRequests = groupedRequests.reduce((acc, group) =>
        acc + group.requests.filter(r => r.status === 'pending').length,
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

    const chartTotal = completedRequests + pendingRequests + canceledRequests;
    const pieChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const label = tooltipItem.label || '';
                        const value = tooltipItem.raw;
                        const pct = chartTotal ? ((value / chartTotal) * 100).toFixed(1) : 0;
                        return `${label}: ${value} (${pct}%)`;
                    },
                },
            },
        },
    };

    const [visibleRequests, setVisibleRequests] = useState(5); // عدد الطلبات المرئية في البداية

    const handleShowMore = () => {
        setVisibleRequests(prev => prev + 5); // زيادة عدد الطلبات المرئية
    };

    const pct = (n) => (totalRequests ? ((n / totalRequests) * 100).toFixed(1) : 0);

    return (
        <div className="container mx-auto py-8" dir="rtl">
            <div className="mb-8 p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-xl text-center font-semibold text-gray-800 mb-4">الإحصائيات</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4 text-center">
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                        <p className="text-2xl font-bold text-gray-800">{totalRequests}</p>
                        <p className="text-sm text-gray-600">إجمالي الطلبات</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                        <p className="text-2xl font-bold text-green-600">{completedRequests}</p>
                        <p className="text-sm text-gray-600">مكتملة ({pct(completedRequests)}%)</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                        <p className="text-2xl font-bold text-amber-600">{pendingRequests}</p>
                        <p className="text-sm text-gray-600">قيد الانتظار ({pct(pendingRequests)}%)</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                        <p className="text-2xl font-bold text-red-600">{canceledRequests}</p>
                        <p className="text-sm text-gray-600">ملغاة ({pct(canceledRequests)}%)</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg w-64 h-64 mx-auto shadow-sm">
                    <Pie data={pieChartData} options={pieChartOptions} />
                </div>
                <p className="text-center text-sm text-gray-500 mt-2">توزيع حالات الطلبات</p>
            </div>

            <hr className="border-gray-200 mb-6" />
            <h2 className="text-xl font-bold text-center mb-6 text-gray-800">الطلبات حسب المستخدم</h2>
            {groupedRequests.slice(0, visibleRequests).map((group, index) => (
                <div key={group.user?.id || index} className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 mb-5 shadow-sm">
                    <div className="flex items-center gap-4 mb-5 pb-4 border-b border-gray-100">
                        <img
                            src={group.user.profileImage || 'https://ui-avatars.com/api?name=' + encodeURIComponent(group.user.name || '')}
                            alt={group.user.name}
                            className="h-14 w-14 object-cover rounded-full border-2 border-gray-200"
                        />
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">{group.user.name}</h3>
                            <p className="text-sm text-gray-500">{group.user.email}</p>
                            <span className={`inline-block mt-1 text-xs font-medium py-0.5 px-2 rounded ${group.user.role === 'admin' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                                {group.user.role === 'admin' ? 'مسؤول' : 'مستخدم'}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {group.requests.map((request) => {
                            const isCompleted = request.status === 'completed';
                            const isCanceled = request.status === 'canceled';
                            const statusLabel = isCompleted ? 'مكتمل' : isCanceled ? 'ملغي' : 'قيد الانتظار';

                            return (
                                <div key={request._id} className="p-4 bg-gray-50/80 rounded-xl border border-gray-100 transition hover:shadow-sm">
                                    <div className="flex flex-wrap justify-between items-start gap-2">
                                        <h4 className="text-base font-semibold text-gray-800 break-words">{request.address}</h4>
                                        <span className={`shrink-0 text-xs font-semibold py-1.5 px-2.5 rounded-full ${isCompleted ? 'bg-green-100 text-green-800' : isCanceled ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}`}>
                                            {statusLabel}
                                        </span>
                                    </div>

                                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                                        <span className="text-gray-600"><strong className="text-gray-700">نوع الخردة:</strong> {request.scrapType}</span>
                                        <span className="text-gray-600"><strong className="text-gray-700">التاريخ:</strong> {new Date(request.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
                                    </div>

                                    {request.images && request.images.length > 0 && (
                                        <div className="mt-3">
                                            <p className="text-sm font-medium text-gray-600 mb-2">الصور</p>
                                            <div className="flex flex-wrap gap-2">
                                                {request.images.map((img, i) => (
                                                    <img key={i} src={img} alt={`صورة ${i + 1}`} className="h-16 w-16 object-cover rounded-lg border border-gray-200" />
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex flex-wrap gap-2 mt-4">
                                        <button
                                            type="button"
                                            onClick={() => onUpdateStatus(request._id, 'completed')}
                                            disabled={isCompleted}
                                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${isCompleted ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
                                        >
                                            {isCompleted ? 'مكتمل' : 'تأكيد الإكمال'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => onDeleteRequest(request._id)}
                                            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition"
                                        >
                                            حذف
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => onCancelRequest(request._id)}
                                            disabled={isCanceled}
                                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${isCanceled ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-amber-500 text-white hover:bg-amber-600'}`}
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
                <div className="text-center mt-6">
                    <button
                        type="button"
                        onClick={handleShowMore}
                        className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition font-medium"
                    >
                        عرض المزيد من المستخدمين
                    </button>
                </div>
            )}
        </div>
    );
};

export default GroupedRequestsList;
