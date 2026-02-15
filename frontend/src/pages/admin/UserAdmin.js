import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../../context/UserContext';
import AddUserPopup from '../../models/AddUserPopup';
import { API_BASE_URL, getServerUrl } from '../../config/api';

const UserAdmin = () => {
    const { registerUser, deleteUser, updateUser, user } = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');



    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/users/users`);
                const data = await response.json();
                if (data && Array.isArray(data.users)) {
                    setUsers(data.users);
                } else {
                    setError("البيانات المستلمة غير صالحة");
                }
            } catch (error) {
                setError('حدث خطأ أثناء جلب المستخدمين.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDeleteUser = async (userId) => {
        try {
            await deleteUser(userId);
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        } catch (error) {
            setError('حدث خطأ أثناء حذف المستخدم.');
        }
    };

    const handleAddUser = async (userData) => {
        await registerUser(userData);
        const response = await fetch(`${API_BASE_URL}/users/users`);
        const data = await response.json();
        if (data && Array.isArray(data.users)) {
            setUsers(data.users);
        } else {
            setError("البيانات المستلمة غير صالحة");
        }
    };

    const handleEditUser = async (userData) => {
        await updateUser(userToEdit.id, userData);
        setUsers((prevUsers) =>
            prevUsers.map(user => user.id === userToEdit.id ? { ...user, ...userData } : user)
        );
        setUserToEdit(null);
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <p>جاري تحميل المستخدمين...</p>;
    }

    if (error) {
        return <p className="text-red-500 text-center">{error}</p>;
    }

    return (
        <div className="space-y-6" dir='rtl'>
            {user && user.role === "admin" ? (
                <>
                    {/* Page Header */}
                    <div className="bg-white rounded-xl shadow-lg p-6 border-r-4 border-blue-600">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800 mb-2">إدارة المستخدمين</h1>
                                <p className="text-gray-600">عرض وإدارة جميع مستخدمي المنصة</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="text"
                                    placeholder="ابحث عن مستخدم..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                                <button
                                    onClick={() => {
                                        setShowForm(true);
                                        setUserToEdit(null);
                                    }}
                                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 font-medium"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                    </svg>
                                    إضافة مستخدم جديد
                                </button>
                            </div>
                        </div>
                    </div>

                    <AddUserPopup
                        isOpen={showForm}
                        onClose={() => setShowForm(false)}
                        onSubmit={userToEdit ? handleEditUser : handleAddUser}
                        userToEdit={userToEdit}
                    />

                    {filteredUsers.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                            <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">لا يوجد مستخدمين</h3>
                            <p className="text-gray-500">لم يتم العثور على أي مستخدمين يطابقون البحث</p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gradient-to-r from-blue-600 to-blue-700">
                                        <tr>
                                            <th className="px-6 py-4 text-right text-xs font-bold text-white uppercase tracking-wider">الصورة</th>
                                            <th className="px-6 py-4 text-right text-xs font-bold text-white uppercase tracking-wider">الاسم</th>
                                            <th className="px-6 py-4 text-right text-xs font-bold text-white uppercase tracking-wider">البريد الإلكتروني</th>
                                            <th className="px-6 py-4 text-right text-xs font-bold text-white uppercase tracking-wider">الدور</th>
                                            <th className="px-6 py-4 text-right text-xs font-bold text-white uppercase tracking-wider">تاريخ الانضمام</th>
                                            <th className="px-6 py-4 text-right text-xs font-bold text-white uppercase tracking-wider">إجراءات</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredUsers.map((user, index) => (
                                            <tr key={user.id} className={`hover:bg-blue-50 transition duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center justify-center">
                                                        {user.profileImage ? (
                                                            <img
                                                                loading="lazy"
                                                                src={getServerUrl(user.profileImage)}
                                                                alt={user.name}
                                                                className="w-12 h-12 rounded-full border-2 border-blue-500 object-cover shadow-md"
                                                            />
                                                        ) : (
                                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                                                                {user.name.charAt(0)}
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="font-semibold text-gray-800">{user.name}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-gray-600">{user.email}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                                                        user.role === 'admin' 
                                                            ? 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300' 
                                                            : 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300'
                                                    }`}>
                                                        {user.role === 'admin' ? '👑 مدير' : '👤 مستخدم'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                                                    {user.createdAt}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => {
                                                                setUserToEdit(user);
                                                                setShowForm(true);
                                                            }}
                                                            className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-2 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
                                                        >
                                                            تعديل
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteUser(user.id)}
                                                            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
                                                        >
                                                            حذف
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="bg-white rounded-xl shadow-lg p-12 text-center max-w-md">
                        <svg className="mx-auto h-16 w-16 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">ليس لديك صلاحيات كافية</h3>
                        <p className="text-gray-600">يجب أن تكون مديراً للوصول إلى هذه الصفحة</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserAdmin;
