// Admin Dashboard Home - Modern Statistics Overview
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    UsersIcon,
    ShoppingBagIcon,
    CollectionIcon,
    CubeIcon,
    ChatAlt2Icon,
    TrendingUpIcon,
    TrendingDownIcon,
    ClockIcon
} from '@heroicons/react/outline';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import axios from 'axios';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        users: { total: 0, change: 0 },
        orders: { total: 0, change: 0 },
        auctions: { total: 0, change: 0 },
        scrap: { total: 0, change: 0 },
        messages: { total: 0, change: 0 }
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch dashboard statistics
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            // Mock data - Replace with actual API calls
            setTimeout(() => {
                setStats({
                    users: { total: 245, change: 12.5 },
                    orders: { total: 89, change: 8.2 },
                    auctions: { total: 34, change: -3.1 },
                    scrap: { total: 156, change: 15.7 },
                    messages: { total: 23, change: 5.4 }
                });
                setLoading(false);
            }, 1000);
        } catch (error) {
            console.error('Error fetching stats:', error);
            setLoading(false);
        }
    };

    const StatCard = ({ title, value, change, icon: Icon, color, link }) => (
        <Link to={link} className="block">
            <div className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-r-4 ${color}`}>
                <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${color.replace('border', 'bg').replace('600', '100')}`}>
                        <Icon className={`h-8 w-8 ${color.replace('border', 'text')}`} />
                    </div>
                    <div className="flex items-center gap-2">
                        {change >= 0 ? (
                            <>
                                <TrendingUpIcon className="h-4 w-4 text-green-500" />
                                <span className="text-sm font-semibold text-green-500">+{change}%</span>
                            </>
                        ) : (
                            <>
                                <TrendingDownIcon className="h-4 w-4 text-red-500" />
                                <span className="text-sm font-semibold text-red-500">{change}%</span>
                            </>
                        )}
                    </div>
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
                <p className="text-3xl font-bold text-gray-800">{value.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-2">مقارنة بالشهر الماضي</p>
            </div>
        </Link>
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6" dir="rtl">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-8 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">مرحباً بك في لوحة التحكم 👋</h1>
                        <p className="text-blue-100">إليك نظرة عامة على أداء المنصة اليوم</p>
                    </div>
                    <div className="hidden md:flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                        <ClockIcon className="h-5 w-5" />
                        <span>{new Date().toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                <StatCard
                    title="إجمالي المستخدمين"
                    value={stats.users.total}
                    change={stats.users.change}
                    icon={UsersIcon}
                    color="border-blue-600"
                    link="/users"
                />
                <StatCard
                    title="الطلبات النشطة"
                    value={stats.orders.total}
                    change={stats.orders.change}
                    icon={ShoppingBagIcon}
                    color="border-green-600"
                    link="/orders"
                />
                <StatCard
                    title="المزادات الجارية"
                    value={stats.auctions.total}
                    change={stats.auctions.change}
                    icon={CollectionIcon}
                    color="border-purple-600"
                    link="/auctions"
                />
                <StatCard
                    title="المواد المتاحة"
                    value={stats.scrap.total}
                    change={stats.scrap.change}
                    icon={CubeIcon}
                    color="border-yellow-600"
                    link="/scrap"
                />
                <StatCard
                    title="الرسائل الجديدة"
                    value={stats.messages.total}
                    change={stats.messages.change}
                    icon={ChatAlt2Icon}
                    color="border-red-600"
                    link="/contact"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">الإيرادات الشهرية</h2>
                    <div className="h-64">
                        <Line
                            data={{
                                labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
                                datasets: [{
                                    label: 'الإيرادات (ل.س)',
                                    data: [12000, 19000, 15000, 25000, 22000, 30000],
                                    borderColor: 'rgb(59, 130, 246)',
                                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                    tension: 0.4,
                                    fill: true
                                }]
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: { display: false }
                                },
                                scales: {
                                    y: { beginAtZero: true }
                                }
                            }}
                        />
                    </div>
                </div>

                {/* Order Status Distribution */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">توزيع حالة الطلبات</h2>
                    <div className="h-64 flex items-center justify-center">
                        <Doughnut
                            data={{
                                labels: ['مكتملة', 'قيد المعالجة', 'ملغاة'],
                                datasets: [{
                                    data: [65, 25, 10],
                                    backgroundColor: [
                                        'rgb(34, 197, 94)',
                                        'rgb(251, 191, 36)',
                                        'rgb(239, 68, 68)'
                                    ],
                                    borderWidth: 0
                                }]
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: 'bottom',
                                        rtl: true
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Orders */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-gray-800">أحدث الطلبات</h2>
                        <Link to="/orders" className="text-sm text-blue-600 hover:text-blue-800">
                            عرض الكل ←
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                    <ShoppingBagIcon className="h-5 w-5 text-green-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-gray-800">طلب جديد #{1234 + item}</p>
                                    <p className="text-xs text-gray-500">منذ {item * 5} دقائق</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Auctions */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-gray-800">مزادات جديدة</h2>
                        <Link to="/auctions" className="text-sm text-blue-600 hover:text-blue-800">
                            عرض الكل ←
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                                    <CollectionIcon className="h-5 w-5 text-purple-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-gray-800">مزاد معادن #{5678 + item}</p>
                                    <p className="text-xs text-gray-500">منذ {item * 10} دقائق</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Messages */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-gray-800">رسائل جديدة</h2>
                        <Link to="/contact" className="text-sm text-blue-600 hover:text-blue-800">
                            عرض الكل ←
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                                    <ChatAlt2Icon className="h-5 w-5 text-red-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-gray-800">رسالة من عميل</p>
                                    <p className="text-xs text-gray-500">منذ {item * 15} دقائق</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">إجراءات سريعة</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Link to="/users" className="flex flex-col items-center gap-2 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                        <UsersIcon className="h-8 w-8 text-blue-600" />
                        <span className="text-sm font-semibold text-gray-800">إضافة مستخدم</span>
                    </Link>
                    <Link to="/auctions" className="flex flex-col items-center gap-2 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                        <CollectionIcon className="h-8 w-8 text-purple-600" />
                        <span className="text-sm font-semibold text-gray-800">مزاد جديد</span>
                    </Link>
                    <Link to="/scrap" className="flex flex-col items-center gap-2 p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
                        <CubeIcon className="h-8 w-8 text-yellow-600" />
                        <span className="text-sm font-semibold text-gray-800">إضافة مادة</span>
                    </Link>
                    <Link to="/contact" className="flex flex-col items-center gap-2 p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                        <ChatAlt2Icon className="h-8 w-8 text-red-600" />
                        <span className="text-sm font-semibold text-gray-800">الرسائل</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
