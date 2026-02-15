// Enhanced Admin Header with Modern Design
import React, { useState, useContext } from 'react';
import { 
    MenuIcon, 
    XIcon, 
    SearchIcon,
    UserCircleIcon,
    LogoutIcon
} from '@heroicons/react/outline';
import UserContext from '../../context/UserContext';
import UserInfoModal from '../../models/UserInfoModal';
import LogoutConfirmModal from '../../models/LogoutConfirmModal';

const AdminHeader = ({ sidebarOpen, setSidebarOpen }) => {
    const { user, logoutUser } = useContext(UserContext);
    const [isUserInfoModalOpen, setIsUserInfoModalOpen] = useState(false);
    const [isLogoutConfirmModalOpen, setIsLogoutConfirmModalOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const handleLogout = () => {
        logoutUser();
        setIsLogoutConfirmModalOpen(false);
    };

    return (
        <>
            <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-40">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        
                        {/* Right Side - Menu Toggle & Logo */}
                        <div className="flex items-center gap-4">
                            {/* Sidebar Toggle */}
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {sidebarOpen ? (
                                    <XIcon className="h-6 w-6" />
                                ) : (
                                    <MenuIcon className="h-6 w-6" />
                                )}
                            </button>

                            {/* Dashboard Title */}
                            <div className="hidden md:flex items-center">
                                <h1 className="text-xl font-bold text-gray-800">
                                    لوحة تحكم المدير
                                </h1>
                            </div>
                        </div>

                        {/* Center - Search Bar (hidden on mobile) */}
                        <div className="hidden lg:flex flex-1 max-w-md mx-8">
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    placeholder="بحث عن المزادات، الطلبات، المستخدمين..."
                                    className="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    dir="rtl"
                                />
                                <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                        </div>

                        {/* Left Side - Actions */}
                        <div className="flex items-center gap-2 md:gap-4">
                            
                            {/* Search Icon for Mobile */}
                            <button className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200">
                                <SearchIcon className="h-5 w-5" />
                            </button>

                            {/* User Profile Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100 transition-all duration-200 focus:outline-none"
                                >
                                    {user?.profileImage ? (
                                        <img
                                            src={user.profileImage}
                                            alt={user.name}
                                            className="h-9 w-9 rounded-full border-2 border-blue-500 object-cover"
                                        />
                                    ) : (
                                        <UserCircleIcon className="h-9 w-9 text-gray-600" />
                                    )}
                                    <div className="hidden md:block text-right mr-2">
                                        <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
                                        <p className="text-xs text-gray-500">مدير النظام</p>
                                    </div>
                                </button>

                                {/* User Menu Dropdown */}
                                {showUserMenu && (
                                    <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50" dir="rtl">
                                        <div className="p-4 border-b border-gray-200">
                                            <p className="font-semibold text-gray-800">{user?.name}</p>
                                            <p className="text-sm text-gray-500">{user?.email}</p>
                                        </div>
                                        <div className="py-2">
                                            <button
                                                onClick={() => {
                                                    setIsUserInfoModalOpen(true);
                                                    setShowUserMenu(false);
                                                }}
                                                className="w-full px-4 py-2 text-right text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3"
                                            >
                                                <UserCircleIcon className="h-5 w-5" />
                                                الملف الشخصي
                                            </button>
                                        </div>
                                        <div className="border-t border-gray-200 py-2">
                                            <button
                                                onClick={() => {
                                                    setIsLogoutConfirmModalOpen(true);
                                                    setShowUserMenu(false);
                                                }}
                                                className="w-full px-4 py-2 text-right text-sm text-red-600 hover:bg-red-50 flex items-center gap-3"
                                            >
                                                <LogoutIcon className="h-5 w-5" />
                                                تسجيل الخروج
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Modals */}
            {isUserInfoModalOpen && (
                <UserInfoModal user={user} onClose={() => setIsUserInfoModalOpen(false)} />
            )}
            {isLogoutConfirmModalOpen && (
                <LogoutConfirmModal
                    onConfirm={handleLogout}
                    onCancel={() => setIsLogoutConfirmModalOpen(false)}
                />
            )}

            {/* Overlay for dropdowns */}
            {showUserMenu && (
                <div
                    className="fixed inset-0 z-30"
                    onClick={() => setShowUserMenu(false)}
                />
            )}
        </>
    );
};

export default AdminHeader;
