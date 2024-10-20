import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserIcon, LoginIcon, LogoutIcon, MenuIcon, XIcon } from '@heroicons/react/solid'; // إضافة أيقونة X للإغلاق
import UserContext from '../context/UserContext';
import UserInfoModal from '../models/UserInfoModal';
import LogoutConfirmModal from '../models/LogoutConfirmModal';
import logo from '../assets/images/logo.png';

const Header = () => {
    const { user, logoutUser } = useContext(UserContext);
    const [isUserInfoModalOpen, setIsUserInfoModalOpen] = useState(false);
    const [isLogoutConfirmModalOpen, setIsLogoutConfirmModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logoutUser();
        setIsLogoutConfirmModalOpen(false);
    };

    return (
        <header className="placeholder-gray-100- shadow-md">
            <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
                {/* اللوغو على اليسار */}
                <div className="flex items-center space-x-2">
                    <Link to="/" className="flex items-center">
                        <img src={logo} alt="Logo" className="h-10 w-auto" />
                        <span className="text-2xl font-bold text-gray-700">EcoTrade</span>
                    </Link>
                </div>

                {/* الروابط في الوسط */}
                <div className="hidden md:flex items-center space-x-8 ">
                    {user ? (<>                    <Link to="/" className="text-gray-700 hover:text-gray-900 hover:shadow-sm">الصفحة الرئيسية</Link>
                        <Link to="/orders" className="text-gray-700 hover:text-gray-900 hover:shadow-sm">صفحة الطلبات</Link>
                        <Link to="/auctions" className="text-gray-700 hover:text-gray-900 hover:shadow-sm">صفحة المزادات</Link>
                        {user ? user.role === "admin" ? (<Link to="/users" className="text-gray-700 hover:text-gray-900 hover:shadow-sm">ادارة المستخدمين</Link>) : "" : ""}
                        {user ? user.role === "admin" ? (<Link to="/scrap" className="text-gray-700 hover:text-gray-900 hover:shadow-sm">ادارة المواد</Link>) : "" : ""}</>) : ""}
                </div>


                {/* الأزرار على اليمين */}
                <div className="hidden md:flex items-center space-x-4">
                    {user ? (
                        <>
                            <button
                                onClick={() => setIsUserInfoModalOpen(true)}
                                className="flex items-center justify-center bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition"
                            >
                                <UserIcon className="w-5 h-5 mr-2 text-gray-600" />
                                {user.name}
                            </button>
                            <button
                                onClick={() => setIsLogoutConfirmModalOpen(true)}
                                className="flex items-center justify-center bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 transition"
                            >
                                <LogoutIcon className="w-5 h-5 mr-2" />
                                تسجيل الخروج
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition"
                            >
                                <LoginIcon className="w-5 h-5 mr-2" />
                                تسجيل الدخول
                            </Link>
                            <Link
                                to="/register"
                                className="flex items-center justify-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 transition"
                            >
                                <UserIcon className="w-5 h-5 mr-2" />
                                تسجيل حساب جديد
                            </Link>
                        </>
                    )}
                </div>

                {/* زر القائمة للأجهزة الصغيرة */}
                <button
                    className={`md:hidden sm:hidden text-black focus:outline-non ${isMenuOpen ? "hidden" : ""}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <MenuIcon className="w-6 h-6" />
                </button>

                {/* القائمة المنسدلة للأجهزة الصغيرة */}
                <div className={`mt-4 md:hidden ${isMenuOpen ? 'block' : 'hidden'} w-full rounded-lg `}>
                    <button
                        className="absolute top-2 right-2 p-1 text-gray-800 hover:bg-gray-200 rounded-full"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <XIcon className="w-6 h-6" />
                    </button>
                    <div className="flex flex-col items-center text-center space-y-4 text-gray-700 py-4">
                        {user ? (<>                    <Link to="/" className="text-gray-700 hover:text-gray-900 hover:shadow-sm">الصفحة الرئيسية</Link>
                            <Link to="/orders" className="text-gray-700 hover:text-gray-900 hover:shadow-sm">صفحة الطلبات</Link>
                            <Link to="/auctions" className="text-gray-700 hover:text-gray-900 hover:shadow-sm">صفحة المزادات</Link>
                            {user ? user.role === "admin" ? (<Link to="/users" className="text-gray-700 hover:text-gray-900 hover:shadow-sm">ادارة المستخدمين</Link>) : "" : ""}
                            {user ? user.role === "admin" ? (<Link to="/scrap" className="text-gray-700 hover:text-gray-900 hover:shadow-sm">ادارة المواد</Link>) : "" : ""}</>) : ""}
                        {user ? (
                            <>
                                <button
                                    onClick={() => setIsUserInfoModalOpen(true)}
                                    className="flex items-center justify-center bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition"
                                >
                                    <UserIcon className="w-5 h-5 mr-2 text-gray-600" />
                                    {user.name}
                                </button>
                                <button
                                    onClick={() => setIsLogoutConfirmModalOpen(true)}
                                    className="flex items-center justify-center bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 transition"
                                >
                                    <LogoutIcon className="w-5 h-5 mr-2" />
                                    تسجيل الخروج
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition"
                                >
                                    <LoginIcon className="w-5 h-5 mr-2" />
                                    تسجيل الدخول
                                </Link>
                                <Link
                                    to="/register"
                                    className="flex items-center justify-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 transition"
                                >
                                    <UserIcon className="w-5 h-5 mr-2" />
                                    تسجيل حساب جديد
                                </Link>
                            </>
                        )}
                    </div>
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
