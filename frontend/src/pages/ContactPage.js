import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import AdminContact from './admin/AdminContact';
import UserContact from './user/UserContact';

const ContactPage = () => {
    const { user } = useContext(UserContext);

    // التحقق من تسجيل الدخول
    if (!user) {
        return (<UserContact></UserContact>);
    }

    // التحقق من الدور
    if (user.role === 'admin') {
        return (<AdminContact></AdminContact>);
    } else {
        return (<UserContact></UserContact>);
    }
};

export default ContactPage;
