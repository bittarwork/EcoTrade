import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { API_BASE_URL } from '../../config/api';

// Register chart elements
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const AdminContact = () => {
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);

    useEffect(() => {
        // Fetch messages from API
        const fetchMessages = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/messages`);
                const data = await response.json();
                setMessages(data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, []);

    const handleRowClick = (message) => {
        setSelectedMessage(message);
    };

    const handleDelete = async (id) => {
        // Delete message using API
        try {
            const response = await fetch(`${API_BASE_URL}/messages/${id}`, {
                method: 'DELETE',
            });

            // Check if deletion was successful
            if (response.ok) {
                setMessages(messages.filter(msg => msg._id !== id)); // Update list after deletion
                setSelectedMessage(null); // إلغاء اختيار الرسالة بعد الحذف
            } else {
                console.error('Error deleting message:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    // إعداد بيانات الرسم البياني
    const prepareChartData = () => {
        const dates = {};
        messages.forEach(msg => {
            const date = new Date(msg.createdAt).toLocaleDateString(); // الحصول على التاريخ فقط
            dates[date] = (dates[date] || 0) + 1; // زيادة العدد
        });

        const labels = Object.keys(dates);
        const data = Object.values(dates);

        return {
            labels: labels,
            datasets: [
                {
                    label: 'عدد الرسائل حسب التاريخ',
                    data: data,
                    fill: false, // لتحديد ما إذا كان يجب ملء المنطقة تحت الخط
                    borderColor: 'rgba(75, 192, 192, 1)',
                    tension: 0.1, // لتحديد مقدار الانحناء في الخط
                },
            ],
        };
    };

    const chartData = prepareChartData();

    return (
        <div className="min-h-screen bg-gray-100 p-5" dir='rtl'>
            <h1 className="text-2xl font-bold mb-5">إدارة الرسائل</h1>

            {/* عرض الرسم البياني */}
            <div className="mb-5 max-w-xl mx-auto"> {/* تعيين العرض الأقصى والتمركز */}
                <Line data={chartData} options={{ maintainAspectRatio: false }} height={200} /> {/* تقليل الارتفاع */}
            </div>

            {/* عرض الرسائل في جدول */}
            <div className="overflow-x-auto mb-5">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">اسم العميل</th>
                            <th className="py-3 px-6 text-left">البريد الإلكتروني</th>
                            <th className="py-3 px-6 text-left">الرسالة</th>
                            <th className="py-3 px-6 text-left">تاريخ الإنشاء</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {messages.map(message => (
                            <tr
                                key={message._id}
                                className="border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleRowClick(message)}
                            >
                                <td className="py-3 px-6">{message.customerName}</td>
                                <td className="py-3 px-6">{message.email}</td>
                                <td className="py-3 px-6">{message.message}</td>
                                <td className="py-3 px-6">{new Date(message.createdAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* مساحة العمليات على الرسائل */}
            <div className="mt-5">
                {selectedMessage ? (
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold">تفاصيل الرسالة</h2>
                        <p><strong>اسم العميل:</strong> {selectedMessage.customerName}</p>
                        <p><strong>البريد الإلكتروني:</strong> {selectedMessage.email}</p>
                        <p><strong>الرسالة:</strong> {selectedMessage.message}</p>
                        <p><strong>تاريخ الإنشاء:</strong> {new Date(selectedMessage.createdAt).toLocaleString()}</p>
                        <button
                            className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                            onClick={() => handleDelete(selectedMessage._id)} // استخدام المعرف هنا
                        >
                            حذف الرسالة
                        </button>
                    </div>
                ) : (
                    <p className="text-gray-500">يرجى اختيار رسالة لعرض التفاصيل.</p>
                )}
            </div>
        </div>
    );
};

export default AdminContact;
