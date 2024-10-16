import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext'; // استيراد الكونتيكست
import AdminComponent from '../pages/admin/AdminAuction'; // استيراد المكون الخاص بالإدمن
import UserComponent from '../pages/user/UserAuction'; // استيراد المكون الخاص بالمستخدم العادي

const AuctionsPage = () => {
    const { user } = useContext(UserContext); // استخدام الكونتيكست للحصول على معلومات المستخدم

    return (
        <div className="">
            {user ? ( // تحقق مما إذا كان هناك مستخدم مسجل
                user.role === 'admin' ? ( // تحقق مما إذا كان المستخدم إدمن
                    <AdminComponent /> // عرض مكون الإدمن
                ) : (
                    <UserComponent /> // عرض مكون المستخدم العادي
                )
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

export default AuctionsPage;
