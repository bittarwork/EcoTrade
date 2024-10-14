import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import UserInfoModal from '../models/UserInfoModal'; // تأكد من أن المسار صحيح
import LogoutConfirmModal from '../models/LogoutConfirmModal'; // تأكد من إضافة المسار الصحيح
import logo from '../assets/images/logo.png'; // تأكد من أن المسار صحيح

const Header = () => {
    const { user, logoutUser } = useContext(UserContext);
    const [isUserInfoModalOpen, setIsUserInfoModalOpen] = useState(false); // حالة فتح نافذة معلومات المستخدم
    const [isLogoutConfirmModalOpen, setIsLogoutConfirmModalOpen] = useState(false); // حالة فتح نافذة تأكيد تسجيل الخروج

    const handleLogout = () => {
        logoutUser();
        setIsLogoutConfirmModalOpen(false); // إغلاق نافذة تأكيد تسجيل الخروج بعد تسجيل الخروج
        // يمكنك هنا إضافة أي منطق آخر، مثل إعادة توجيه المستخدم إلى الصفحة الرئيسية
    };

    return (
        <header className="bg-white text-gray-800 p-4 shadow-md">
            <nav className="container mx-auto flex justify-between items-center">
                {/* عرض الشعار */}
                <Link to="/" className="flex items-center">
                    <img src={logo} alt="Logo" className="h-10 mr-2" />
                    <span className="text-3xl font-bold hover:text-gray-600">EcoTrade</span>
                </Link>
                <div className="flex space-x-8">
                    <Link to="/" className="hover:text-gray-600">الصفحة الرئيسية</Link>
                    <Link to="/orders" className="hover:text-gray-600">صفحة الطلبات</Link>
                    <Link to="/auctions" className="hover:text-gray-600">صفحة المزادات</Link>
                </div>
                <div className="flex items-center space-x-4">
                    {user ? (
                        <>
                            <button
                                onClick={() => setIsUserInfoModalOpen(true)} // فتح نافذة معلومات المستخدم
                                className="flex items-center bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition">
                                <img src={user.profileImage} alt="User" className="w-8 h-8 rounded-full mr-2" />
                                {user.name}
                            </button>
                            <button
                                onClick={() => setIsLogoutConfirmModalOpen(true)} // فتح نافذة تأكيد تسجيل الخروج
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition">
                                تسجيل الخروج
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition">
                                تسجيل الدخول
                            </Link>
                            <Link
                                to="/register"
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 transition">
                                تسجيل حساب جديد
                            </Link>
                        </>
                    )}
                </div>
            </nav>
            {isUserInfoModalOpen && <UserInfoModal user={user} onClose={() => setIsUserInfoModalOpen(false)} />}
            {isLogoutConfirmModalOpen && (
                <LogoutConfirmModal
                    onConfirm={handleLogout}
                    onCancel={() => setIsLogoutConfirmModalOpen(false)}
                />
            )}
        </header>
    );
};

export default Header;
