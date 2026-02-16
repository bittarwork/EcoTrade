import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from '../context/UserContext';
import RequestsList from '../components/RequestsList';
import GroupedRequestsList from '../components/GroupedRequestsList';
import RequestPopup from '../models/RequestPopup';
import { Link } from 'react-router-dom';

const OrdersPage = () => {
    const { user, loading } = useContext(UserContext);
    const [requests, setRequests] = useState([]);
    const [groupedRequests, setGroupedRequests] = useState([]);
    const [statusMessage, setStatusMessage] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [requestsLoading, setRequestsLoading] = useState(true);
    const apiUrl = process.env.REACT_APP_API_URL;

    // Auto-hide success/error message after 4s
    useEffect(() => {
        if (!statusMessage) return;
        const t = setTimeout(() => setStatusMessage(''), 4000);
        return () => clearTimeout(t);
    }, [statusMessage]);

    useEffect(() => {
        const fetchRequests = async () => {
            if (!user) return;
            setRequestsLoading(true);
            try {
                const url = user.role === 'admin'
                    ? `${apiUrl}/requests/grouped`
                    : `${apiUrl}/requests/${user.id}`;
                const response = await axios.get(url, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                if (user.role === 'admin') {
                    setGroupedRequests(response.data);
                } else {
                    setRequests(response.data);
                }
            } catch (error) {
                console.error(error);
                setStatusMessage('فشل تحميل الطلبات. تحقق من الاتصال.');
            } finally {
                setRequestsLoading(false);
            }
        };

        if (!loading && user) fetchRequests();
    }, [apiUrl, user, loading]);

    const createRequest = async (newRequest) => {
        if (!user) return; // التحقق من وجود user قبل المتابعة
        const formData = new FormData();
        formData.append('userId', user.id);
        formData.append('address', newRequest.address);
        formData.append('scrapType', newRequest.scrapType);
        formData.append('position', JSON.stringify(newRequest.position));

        newRequest.images.forEach((image) => {
            formData.append('images', image);
        });

        try {
            const response = await axios.post(`${apiUrl}/requests/create`, formData, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            });
            setStatusMessage(response.data.message);
            setRequests([...requests, response.data.request]);
        } catch (error) {
            console.error(error);
        }
    };

    const updateRequestStatus = async (requestId) => {
        if (!user) return; // التحقق من وجود user قبل المتابعة
        try {
            const response = await axios.put(`${apiUrl}/requests/update-status`, {
                requestId,
                status: 'completed' // الحالة الجديدة
            }, { headers: { Authorization: `Bearer ${user.token}` } });

            setStatusMessage(response.data.message);

            if (user.role === 'admin') {
                // تحديث الطلب ضمن groupedRequests في حال كان المستخدم هو الادمن
                setGroupedRequests((prevGroupedRequests) =>
                    prevGroupedRequests.map((group) => {
                        // البحث عن الطلب المطلوب داخل المجموعة الحالية
                        const updatedRequests = group.requests.map((request) =>
                            request._id === requestId ? { ...request, status: 'completed' } : request
                        );
                        return { ...group, requests: updatedRequests };
                    })
                );
            } else {
                // تحديث الطلب في مصفوفة requests للمستخدم العادي
                setRequests((prevRequests) =>
                    prevRequests.map((request) =>
                        request.id === requestId ? { ...request, status: 'completed' } : request
                    )
                );
            }
        } catch (error) {
            console.error(error);
        }
    };
    // 1. تعديل OrdersPage لتضمين دالة cancelRequest
    const cancelRequest = async (requestId) => {
        if (!user) return; // التحقق من وجود user قبل المتابعة
        try {
            const response = await axios.put(`${apiUrl}/requests/update-status`, {
                requestId,
                status: 'canceled' // الحالة الجديدة
            }, { headers: { Authorization: `Bearer ${user.token}` } });

            setStatusMessage(response.data.message);

            if (user.role === 'admin') {
                // تحديث الطلب ضمن groupedRequests في حال كان المستخدم هو الادمن
                setGroupedRequests((prevGroupedRequests) =>
                    prevGroupedRequests.map((group) => {
                        // البحث عن الطلب المطلوب داخل المجموعة الحالية
                        const updatedRequests = group.requests.map((request) =>
                            request._id === requestId ? { ...request, status: 'canceled' } : request
                        );
                        return { ...group, requests: updatedRequests };
                    })
                );
            } else {
                // تحديث الطلب في مصفوفة requests للمستخدم العادي
                setRequests((prevRequests) =>
                    prevRequests.map((request) =>
                        request.id === requestId ? { ...request, status: 'canceled' } : request
                    )
                );
            }
        } catch (error) {
            console.error(error);
        }
    };
    const deleteRequest = async (requestId) => {
        if (!user || user.role !== 'admin') return; // التحقق من وجود user وصلاحية الادمن قبل المتابعة
        try {
            // استدعاء API لحذف الطلب
            await axios.delete(`${apiUrl}/requests/${requestId}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });

            setStatusMessage("تم حذف الطلب بنجاح.");

            // تحديث مصفوفة groupedRequests لإزالة الطلب المحذوف
            setGroupedRequests((prevGroupedRequests) =>
                prevGroupedRequests.map((group) => {
                    // استبعاد الطلب المحذوف من قائمة الطلبات في المجموعة الحالية
                    const updatedRequests = group.requests.filter(
                        (request) => request._id !== requestId
                    );
                    return { ...group, requests: updatedRequests };
                }).filter(group => group.requests.length > 0) // إزالة أي مجموعة فارغة
            );
        } catch (error) {
            console.error(error);
            setStatusMessage("حدث خطأ أثناء محاولة حذف الطلب.");
        }
    };


    const filteredRequests = requests.filter(request =>
        request.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50/50" dir="rtl">
            {user ? (
                <div className="p-4 sm:p-6 mb-6 max-w-6xl mx-auto">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-gray-800">
                        {user.role === 'admin' ? 'إدارة الطلبات' : 'طلباتك'}
                    </h1>

                    {statusMessage && (
                        <div
                            role="alert"
                            className={`mb-4 py-3 px-4 rounded-lg text-center font-medium ${
                                statusMessage.includes('خطأ') || statusMessage.includes('فشل')
                                    ? 'bg-red-50 text-red-700 border border-red-200'
                                    : 'bg-green-50 text-green-700 border border-green-200'
                            }`}
                        >
                            {statusMessage}
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center mb-6">
                        {user.role !== 'admin' && (
                            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                                <label htmlFor="orders-search" className="text-sm font-medium text-gray-600">
                                    بحث عن عنوان الطلب
                                </label>
                                <input
                                    id="orders-search"
                                    type="text"
                                    placeholder="أدخل جزء من العنوان..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        )}
                        {user.role !== 'admin' && (
                            <button
                                type="button"
                                onClick={() => setIsPopupOpen(true)}
                                className="bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition duration-200 shadow-sm font-medium"
                            >
                                إنشاء طلب جديد
                            </button>
                        )}
                    </div>

                    {isPopupOpen && (
                        <RequestPopup
                            onClose={() => setIsPopupOpen(false)}
                            onCreateRequest={(newRequest) => {
                                createRequest(newRequest);
                                setIsPopupOpen(false);
                            }}
                        />
                    )}

                    {requestsLoading ? (
                        <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                            <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-3" />
                            <p>جاري تحميل الطلبات...</p>
                        </div>
                    ) : user.role === 'admin' ? (
                        groupedRequests.length > 0 ? (
                            <GroupedRequestsList
                                groupedRequests={groupedRequests}
                                onUpdateStatus={updateRequestStatus}
                                onDeleteRequest={deleteRequest}
                                onCancelRequest={cancelRequest}
                            />
                        ) : (
                            <div className="text-center text-gray-500 p-8 border border-gray-200 rounded-xl bg-white">
                                <p>لا توجد طلبات متاحة حالياً.</p>
                            </div>
                        )
                    ) : filteredRequests.length > 0 ? (
                        <RequestsList
                            requests={filteredRequests}
                            onUpdateStatus={updateRequestStatus}
                            userRole={user.role}
                        />
                    ) : (
                        <div className="text-center text-gray-500 p-8 border border-gray-200 rounded-xl bg-white">
                            <p>{searchQuery ? 'لا توجد نتائج تطابق البحث.' : 'لا توجد طلبات. يمكنك إنشاء طلب جديد.'}</p>
                        </div>
                    )}


                </div>
            ) : (
                <div className="text-center p-6">
                    <p className="text-lg mb-4">لا يوجد مستخدم مسجل، يرجى تسجيل الدخول.</p>
                    <div className="flex justify-center space-x-4">
                        <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            تسجيل الدخول
                        </Link>
                        <span>أو</span>
                        <Link to="/register" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                            إنشاء حساب
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrdersPage;

