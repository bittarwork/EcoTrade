import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from '../context/UserContext';
import RequestsList from '../components/RequestsList';
import RequestPopup from '../models/RequestPopup';

const OrdersPage = () => {
    const { user, loading } = useContext(UserContext);
    const [requests, setRequests] = useState([]);
    const [statusMessage, setStatusMessage] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        if (!loading && user) {
            const fetchRequests = async () => {
                try {
                    const response = await axios.get(`${apiUrl}/requests/${user.id}`, {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        }
                    });
                    setRequests(response.data);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchRequests();
        }
    }, [apiUrl, user, loading]);

    const createRequest = async (newRequest) => {
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

    const updateRequestStatus = async (requestId, newStatus) => {
        try {
            const response = await axios.put(`${apiUrl}/requests/update-status`, {
                requestId,
                status: newStatus
            }, { headers: { Authorization: `Bearer ${user.token}` } });

            setStatusMessage(response.data.message);
            setRequests((prevRequests) =>
                prevRequests.map((request) =>
                    request.id === requestId ? { ...request, status: newStatus } : request
                )
            );
        } catch (error) {
            console.error(error);
        }
    };

    const filteredRequests = requests.filter(request =>
        request.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen p-6 bg-gray-100">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">طلباتك</h1>

            {user ? (

                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    {statusMessage && (
                        <div className="mt-4">
                            <p className={`font-semibold text-center ${statusMessage.includes('خطأ') ? 'text-red-500' : 'text-green-600'}`}>
                                {statusMessage}
                            </p>
                        </div>
                    )}
                    <div className="flex gap-x-3 justify-end items-center mb-4">
                        <button
                            onClick={() => setIsPopupOpen(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 shadow"
                        >
                            إنشاء طلب جديد
                        </button>
                        <input
                            type="text"
                            placeholder="بحث عن عنوان الطلب..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="border border-gray-300 rounded px-4 py-2 w-64 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <label>:قم بالبحث</label>
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

                    <h2 className="text-2xl font-semibold mt-4 mb-2">عرض الطلبات</h2>
                    {filteredRequests.length > 0 ? (
                        <RequestsList requests={filteredRequests} onUpdateStatus={updateRequestStatus} userRole={user.role} />
                    ) : (
                        <p className="text-gray-500">لا توجد طلبات مطابقة.</p>
                    )}
                </div>
            ) : (
                <p className="text-red-500 font-semibold text-center">يرجى تسجيل الدخول للوصول إلى الطلبات.</p>
            )}


        </div>
    );
};

export default OrdersPage;
