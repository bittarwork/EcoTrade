import React, { useState, useContext } from 'react';
import UserContext from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const { loginUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await loginUser({ email, password });
            // هنا يمكن أن تضيف منطقًا لتوجيه المستخدم حسب دوره
            const userRole = JSON.parse(localStorage.getItem('user')).role;
            if (userRole === 'admin') {
                navigate('/'); // الصفحة المناسبة للإدارة
            } else {
                navigate('/'); // الصفحة المناسبة للمستخدمين العاديين
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center mt-10">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">تسجيل الدخول</h2>
                <form onSubmit={handleLogin} className="flex flex-col">
                    <input
                        type="email"
                        placeholder="البريد الإلكتروني"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mb-4 border border-gray-300 p-2 rounded transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="كلمة المرور"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mb-6 border border-gray-300 p-2 rounded transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-500 transition duration-200">
                        تسجيل الدخول
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600">
                    ليس لديك حساب؟ <a href="/register" className="text-blue-600 hover:underline">إنشاء حساب جديد</a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
