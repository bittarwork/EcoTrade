import React, { useContext } from 'react';
import UserContext from '../context/UserContext'; // استيراد الكونتيكست
import AdminComponent from '../pages/admin/AdminAuction'; // استيراد المكون الخاص بالإدمن
import UserComponent from '../pages/user/UserAuction'; // استيراد المكون الخاص بالمستخدم العادي

const AuctionsPage = () => {
    const { user } = useContext(UserContext); // استخدام الكونتيكست للحصول على معلومات المستخدم

    return (
        <div>
            {user ? ( // تحقق مما إذا كان هناك مستخدم مسجل
                user.role === 'admin' ? ( // تحقق مما إذا كان المستخدم إدمن
                    <AdminComponent /> // عرض مكون الإدمن
                ) : (
                    <UserComponent /> // عرض مكون المستخدم العادي
                )
            ) : (
                <div>لا يوجد مستخدم مسجل، يرجى تسجيل الدخول.</div> // رسالة للمستخدم في حالة عدم تسجيل الدخول
            )}
        </div>
    );
};

export default AuctionsPage;
