import React, { useState, useEffect } from 'react';

const AddUserPopup = ({ isOpen, onClose, onSubmit, userToEdit }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState(null);
    const [passwordStrength, setPasswordStrength] = useState(0);

    // دالة لتقييم قوة كلمة المرور
    const evaluatePasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength++; // طول الكلمة
        if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength++; // أحرف كبيرة وصغيرة
        if (/\d/.test(password)) strength++; // أرقام
        if (/[@$!%*?&]/.test(password)) strength++; // أحرف خاصة

        return strength; // 0 إلى 4
    };

    // تحديث قوة كلمة المرور عند التغيير
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        const strength = evaluatePasswordStrength(newPassword);
        setPasswordStrength(strength);
    };

    // إذا كانت الحالة لتعديل معلومات المستخدم، نقوم بملء الحقول بالبيانات الموجودة
    useEffect(() => {
        if (isOpen && userToEdit) {
            setName(userToEdit.name);
            setEmail(userToEdit.email);
            setRole(userToEdit.role);
            setPassword(''); // لا نملأ كلمة المرور لتكون آمنة
            setPasswordStrength(0); // إعادة تعيين قوة كلمة المرور
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
            if (password) userData.password = password; // أضف كلمة المرور فقط إذا تم إدخالها
            await onSubmit(userData); // استدعاء دالة onSubmit مع بيانات المستخدم
            onClose();
        } catch (error) {
            setError('حدث خطأ أثناء العملية. يرجى المحاولة مرة أخرى.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">
                    {userToEdit ? 'تعديل معلومات المستخدم' : 'إضافة مستخدم جديد'}
                </h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}

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
                    onClick={onClose} // إغلاق النموذج
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-4"
                >
                    إلغاء
                </button>
            </form>
        </div>
    );
};

export default AddUserPopup;
