import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png'; // تأكد من أن المسار صحيح

const Footer = () => {
    return (
        <footer className="bg-gray-100 text-gray-800 p-8 mt-8">
            <div className='h-0.5 min-w-full bg-gray-300 mb-1'></div>
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="flex flex-col mb-4 md:mb-0">
                    <h2 className="text-lg font-semibold mb-2">روابط مفيدة</h2>
                    <Link to="/contact" className="hover:text-gray-600 mb-1">تواصل مع المدراء</Link>
                    <Link to="/developers" className="hover:text-gray-600 mb-1">معلومات المطورين</Link>
                    <Link to="/privacy-policy" className="hover:text-gray-600 mb-1">سياسة الخصوصية</Link>
                    <Link to="/terms-of-service" className="hover:text-gray-600 mb-1">شروط الخدمة</Link>
                </div>
                <div className="flex flex-col items-center mb-4 md:mb-0">
                    {/* عرض الشعار */}
                    <img src={logo} alt="Logo" className="h-32 mb-4" />
                    <h2 className="text-lg font-semibold mb-2">تابعنا على</h2>
                    <div className="flex space-x-4">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600">فيسبوك</a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600">تويتر</a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600">إنستغرام</a>
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600">لينكدإن</a>
                    </div>
                </div>
            </div>
            <div className="text-center mt-4">
                <p className="text-sm">حقوق النشر © 2024 أسامة بيطار. جميع الحقوق محفوظة.</p>
            </div>
        </footer>
    );
};

export default Footer;
