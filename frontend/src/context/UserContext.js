import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const UserContext = createContext();
const API_URL = process.env.REACT_APP_API_URL;
const SESSION_DURATION = 6 * 60 * 60 * 1000;

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // دالة لتسجيل المستخدم
    const registerUser = async (userData) => {
        try {
            await axios.post(`${API_URL}/users/register`, userData);
        } catch (error) {
            // إعادة الخطأ للمكون الذي يستدعيها
            throw error;
        }
    };

    // دالة لتسجيل الدخول
    const loginUser = async (credentials) => {
        try {
            const response = await axios.post(`${API_URL}/users/login`, credentials);
            setUser(response.data.user);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('sessionStart', Date.now());
        } catch (error) {
            if (error.response && error.response.status === 401) {
                throw new Error('فشل تسجيل الدخول: بيانات الاعتماد غير صحيحة.');
            } else {
                throw new Error('حدث خطأ غير متوقع أثناء تسجيل الدخول.');
            }
        }
    };

    // دالة لتسجيل الخروج
    const logoutUser = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('sessionStart');
        setUser(null);
    };

    // دالة للتحقق من انتهاء صلاحية الجلسة
    const checkSessionExpiration = useCallback(() => {
        const sessionStart = localStorage.getItem('sessionStart');
        if (sessionStart && Date.now() - sessionStart > SESSION_DURATION) {
            logoutUser();
            alert("انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى.");
        }
    }, []);

    // دالة لجلب بيانات المستخدم
    const fetchUserProfile = async (userId) => {
        try {
            checkSessionExpiration();
            const response = await axios.get(`${API_URL}/users/profile/${userId}`);
            setUser(response.data.user);
        } catch (error) {
            console.error("فشل في جلب بيانات المستخدم:", error);
        }
    };

    // دالة لتحديث بيانات المستخدم
    const updateUser = async (userId, updatedData) => {
        try {
            checkSessionExpiration();
            await axios.put(`${API_URL}/users/profile/${userId}`, updatedData);
        } catch (error) {
            console.error("فشل في تحديث بيانات المستخدم:", error);
        }
    };

    // دالة لحذف المستخدم
    const deleteUser = async (userId) => {
        try {
            checkSessionExpiration();
            await axios.delete(`${API_URL}/users/profile/${userId}`);
        } catch (error) {
            console.error("فشل في حذف المستخدم:", error);
        }
    };

    // تأثير لجلب المستخدم من localStorage عند التحميل والتحقق من انتهاء الجلسة
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            checkSessionExpiration();
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, [checkSessionExpiration]);

    return (
        <UserContext.Provider value={{
            user,
            loading,
            registerUser,
            loginUser,
            logoutUser,
            fetchUserProfile,
            updateUser,
            deleteUser,
        }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
