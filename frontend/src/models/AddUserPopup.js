import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../context/UserContext';

const AddUserPopup = ({ isOpen, onClose, userToEdit }) => {
    const { registerUser } = useContext(UserContext); // استخدم السياق
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState(null);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const evaluatePasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[@$!%*?&]/.test(password)) strength++;
        return strength;
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        const strength = evaluatePasswordStrength(newPassword);
        setPasswordStrength(strength);
    };

    useEffect(() => {
        if (isOpen && userToEdit) {
            setName(userToEdit.name);
            setEmail(userToEdit.email);
            setRole(userToEdit.role);
            setPassword('');
            setPasswordStrength(0);
        } else {
            setName('');
            setEmail('');
            setRole('');
            setPassword('');
            setPasswordStrength(0);
        }
    }, [isOpen, userToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const userData = { name, email, role };
            if (password) userData.password = password;
            await registerUser(userData); // استخدم دالة التسجيل
            onClose();
        } catch (error) {
            // هنا يتم التعامل مع الأخطاء الواردة من الخادم
            setError(error.response?.data?.message || 'حدث خطأ أثناء العملية. يرجى المحاولة مرة أخرى.');
        }
    };

    return (
        isOpen && (
            <div className="modal-overlay">
                <div className="modal-content bg-white p-6 rounded shadow-md w-96">
                    <form onSubmit={handleSubmit}>
                        <h2 className="text-2xl font-bold mb-4">
                            {userToEdit ? 'تعديل معلومات المستخدم' : 'إضافة مستخدم جديد'}
                        </h2>

                        {/* عرض الخطأ بشكل جميل */}
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                                <strong className="font-bold">خطأ!</strong>
                                <span className="block sm:inline">{error}</span>
                            </div>
                        )}

                        <div className="mb-4">
                            <label className="block text-gray-700">الاسم</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 border rounded"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">البريد الإلكتروني</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border rounded"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">كلمة المرور (اترك فارغًا للتعديل)</label>
                            <input
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                className="w-full px-3 py-2 border rounded"
                            />
                            <div className="h-1 mt-2 rounded" style={{
                                width: `${(passwordStrength / 4) * 100}%`,
                                backgroundColor: passwordStrength === 4 ? 'green' :
                                    passwordStrength === 3 ? 'yellow' :
                                        passwordStrength === 2 ? 'orange' :
                                            passwordStrength === 1 ? 'red' : 'transparent'
                            }} />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">نوع المستخدم</label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full px-3 py-2 border rounded"
                                required
                            >
                                <option value="">اختر نوع المستخدم</option>
                                <option value="user">مستخدم</option>
                                <option value="admin">مدير</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            {userToEdit ? 'تحديث' : 'تسجيل'}
                        </button>

                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-4"
                        >
                            إلغاء
                        </button>
                    </form>
                </div>
                <style jsx>{`
                    .modal-overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.5);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .modal-content {
                        position: relative;
                        z-index: 10;
                    }
                `}</style>
            </div>
        )
    );
};

export default AddUserPopup;
