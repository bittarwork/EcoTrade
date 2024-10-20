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
    };


    // دالة لتسجيل الدخول
    const loginUser = async (credentials) => {
        const response = await axios.post(`${API_URL}/users/login`, credentials);
        setUser(response.data.user);
        localStorage.setItem('user', JSON.stringify(response.data.user));
    };

    // دالة لتسجيل الخروج
    const logoutUser = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    // دالة لجلب بيانات المستخدم
    const fetchUserProfile = async (userId) => {
        const response = await axios.get(`${API_URL}/users/profile/${userId}`);
        setUser(response.data.user);
    };

    // دالة لتحديث بيانات المستخدم
    const updateUser = async (userId, updatedData) => {
        const response = await axios.put(`${API_URL}/users/profile/${userId}`, updatedData);

    };

    // دالة لحذف المستخدم
    const deleteUser = async (userId) => {
        await axios.delete(`${API_URL}/users/profile/${userId}`);
    };

    // تأثير لجلب المستخدم من localStorage عند التحميل
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

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
