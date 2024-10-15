import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();
const API_URL = process.env.REACT_APP_API_URL;

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // دالة لتسجيل المستخدم
    const registerUser = async (userData) => {
        const response = await axios.post(`${API_URL}/users/register`, userData);
        setUser(response.data.user);
        const userDataWithToken = {
            ...response.data.user,
            token: response.data.token,
        };
        localStorage.setItem('user', JSON.stringify(userDataWithToken));
        setSessionExpiration(); // تعيين انتهاء الجلسة
    };

    // دالة لتسجيل الدخول
    const loginUser = async (credentials) => {
        const response = await axios.post(`${API_URL}/users/login`, credentials);
        const userDataWithToken = {
            ...response.data.user,
            token: response.data.token,
        };
        setUser(userDataWithToken);
        localStorage.setItem('user', JSON.stringify(userDataWithToken));
        setSessionExpiration(); // تعيين انتهاء الجلسة
    };

    // دالة لتسجيل الخروج
    const logoutUser = () => {
        localStorage.removeItem('user'); // إزالة بيانات المستخدم
        localStorage.removeItem('sessionExpiration'); // إزالة مدة انتهاء الجلسة
        setUser(null); // إعادة تعيين الحالة
    };

    // دالة لجلب بيانات المستخدم
    const fetchUserProfile = async (userId) => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const response = await axios.get(`${API_URL}/users/profile/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data.user);
    };

    // دالة لتحديث بيانات المستخدم
    const updateUser = async (userId, updatedData) => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const response = await axios.put(`${API_URL}/users/profile/${userId}`, updatedData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data.user);
        localStorage.setItem('user', JSON.stringify(response.data.user));
    };

    // دالة لحذف المستخدم
    const deleteUser = async (userId) => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        await axios.delete(`${API_URL}/users/profile/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setUser(null);
        localStorage.removeItem('user');
    };

    // دالة لتعيين مدة انتهاء الجلسة
    const setSessionExpiration = () => {
        const expirationTime = new Date().getTime() + 6 * 60 * 60 * 1000; // 6 ساعات
        localStorage.setItem('sessionExpiration', expirationTime);
    };

    // دالة للتحقق من انتهاء الجلسة
    const checkSessionExpiration = () => {
        const expirationTime = localStorage.getItem('sessionExpiration');
        if (expirationTime && new Date().getTime() > expirationTime) {
            localStorage.removeItem('user');
            localStorage.removeItem('sessionExpiration');
            setUser(null);
        }
    };

    // تأثير لجلب المستخدم من localStorage عند التحميل
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            console.log("User Data:", parsedUser);
            setUser(JSON.parse(storedUser));
            checkSessionExpiration(); // تحقق من انتهاء الجلسة
        }
        setLoading(false);
    }, []);

    return (
        <UserContext.Provider value={{
            user,
            loading,
            registerUser,
            loginUser,
            logoutUser, // إضافة دالة تسجيل الخروج
            fetchUserProfile,
            updateUser,
            deleteUser,
        }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
