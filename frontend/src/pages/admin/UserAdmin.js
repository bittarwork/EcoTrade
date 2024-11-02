import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../../context/UserContext';
import AddUserPopup from '../../models/AddUserPopup';

const UserAdmin = () => {
    const { registerUser, deleteUser, updateUser, user } = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const REACT_APP_API_URL = process.env.REACT_APP_API_URL;



    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${REACT_APP_API_URL}/users/users`);
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
    }, [REACT_APP_API_URL]);

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
        const response = await fetch(`${REACT_APP_API_URL}/users/users`);
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
        <div className="p-6 bg-gray-50 min-h-screen" dir='rtl'>
            {user && user.role === "admin" ? (
                <>
                    <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">إدارة المستخدمين</h1>

                    <div className="flex justify-between mb-6">
                        <input
                            type="text"
                            placeholder="ابحث عن مستخدم..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border border-gray-300 rounded px-4 py-2 w-1/3"
                        />
                        <button
                            onClick={() => {
                                setShowForm(true);
                                setUserToEdit(null);
                            }}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            إضافة مستخدم جديد
                        </button>
                    </div>

                    <AddUserPopup
                        isOpen={showForm}
                        onClose={() => setShowForm(false)}
                        onSubmit={userToEdit ? handleEditUser : handleAddUser}
                        userToEdit={userToEdit}
                    />

                    {filteredUsers.length === 0 ? (
                        <p className="text-red-500 text-center">لا يوجد مستخدمين لعرضهم.</p>
                    ) : (
                        <div className="overflow-x-auto shadow-md rounded-lg">
                            <table className="min-w-full bg-white border border-gray-300">
                                <thead className="bg-blue-500 text-white">
                                    <tr>
                                        <th className="border border-gray-300 px-4 py-3 text-right">الصورة الشخصية</th>
                                        <th className="border border-gray-300 px-4 py-3 text-right">الاسم</th>
                                        <th className="border border-gray-300 px-4 py-3 text-right">البريد الإلكتروني</th>
                                        <th className="border border-gray-300 px-4 py-3 text-right">الدور</th>
                                        <th className="border border-gray-300 px-4 py-3 text-right">تاريخ الانضمام</th>
                                        <th className="border border-gray-300 px-4 py-3 text-right">إجراءات</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map(user => (
                                        <tr key={user.id} className="hover:bg-gray-100 transition duration-300">
                                            <td className="border border-gray-300 px-4 py-2 text-center">
                                                {user.profileImage ? (
                                                    <img
                                                        loading="lazy"
                                                        src={`http://localhost:5000/${user.profileImage}`}
                                                        alt={user.name}
                                                        className="w-12 h-12 rounded-full mx-auto border"
                                                    />
                                                ) : (
                                                    <span className="text-gray-500">لا توجد صورة</span>
                                                )}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2 text-right font-medium">{user.name}</td>
                                            <td className="border border-gray-300 px-4 py-2 text-right">{user.email}</td>
                                            <td className="border border-gray-300 px-4 py-2 text-right">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.role === 'admin' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2 text-right">{user.createdAt}</td>
                                            <td className="border border-gray-300 px-4 py-2 text-right">
                                                <button
                                                    onClick={() => {
                                                        setUserToEdit(user);
                                                        setShowForm(true);
                                                    }}
                                                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
                                                >
                                                    تعديل
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteUser(user.id)}
                                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                                >
                                                    حذف
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            ) : (
                <p className="text-red-500 text-center">ليس لديك صلاحيات كافية.</p>
            )}
        </div>
    );
};

export default UserAdmin;
