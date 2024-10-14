import React, { useState, useContext } from 'react';
import UserContext from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const { registerUser } = useContext(UserContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        if (profileImage) {
            formData.append('profileImage', profileImage);
        }

        try {
            await registerUser(formData);
            navigate('/login'); // إعادة التوجيه إلى صفحة تسجيل الدخول بعد التسجيل
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center mt-10">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">تسجيل حساب جديد</h2>
                <form onSubmit={handleRegister} className="flex flex-col">
                    <input
                        type="text"
                        placeholder="الاسم"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="mb-4 border border-gray-300 p-2 rounded transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="email"
                        placeholder="البريد الإلكتروني"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mb-4 border border-gray-300 p-2 rounded transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="password"
                        placeholder="كلمة المرور"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mb-4 border border-gray-300 p-2 rounded transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="file"
                        onChange={(e) => setProfileImage(e.target.files[0])}
                        className="mb-6 border border-gray-300 p-2 rounded"
                    />
                    <button type="submit" className="bg-green-600 text-white py-2 rounded hover:bg-green-500 transition duration-200">
                        تسجيل
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600">
                    لديك حساب بالفعل؟ <a href="/login" className="text-blue-600 hover:underline">تسجيل الدخول</a>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
