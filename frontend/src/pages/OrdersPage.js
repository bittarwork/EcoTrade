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
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchRequests = async () => {
            if (!user) return; // التحقق من وجود user قبل المتابعة
            try {
                const url = user.role === 'admin'
                    ? `${apiUrl}/requests/grouped`
                    : `${apiUrl}/requests/${user.id}`;

                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    }
                });

                if (user.role === 'admin') {
                    setGroupedRequests(response.data);
                } else {
                    setRequests(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        if (!loading && user) {
            fetchRequests();
        }
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
        <div className="min-h-screen ">


            {user ? (

                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    {user && user.role === 'admin' ? (
                        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">عرض كامل الطلبات المتلقاة الى الموقع</h1>
                    ) : (
                        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">طلباتك</h1>
                    )}
                    {statusMessage && (
                        <div className="mt-4">
                            <p className={`font-semibold text-center ${statusMessage.includes('خطأ') ? 'text-red-500' : 'text-green-600'}`}>
                                {statusMessage}
                            </p>
                        </div>
                    )}
                    <div className="flex gap-x-3 justify-end items-center mb-4">
                        <input
                            type="text"
                            placeholder="بحث عن عنوان الطلب..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="border border-gray-300 rounded px-4 py-2 w-64 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <label>:قم بالبحث</label>
                        {user.role === "admin" ? "" : (
                            <button
                                onClick={() => setIsPopupOpen(true)}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 shadow"
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

                    {user.role === 'admin' ? (
                        groupedRequests.length > 0 ? (
                            <GroupedRequestsList
                                groupedRequests={groupedRequests}
                                onUpdateStatus={updateRequestStatus}
                                onDeleteRequest={deleteRequest} // تمرير دالة الحذف
                                onCancelRequest={cancelRequest} // تمرير دالة الإلغاء
                            />
                        ) : (
                            <p className="text-gray-500">لا توجد طلبات.</p>
                        )
                    ) : (
                        filteredRequests.length > 0 ? (
                            <RequestsList requests={filteredRequests} onUpdateStatus={updateRequestStatus} userRole={user.role} />
                        ) : (
                            <p className="text-gray-500">لا توجد طلبات مطابقة.</p>
                        )
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

