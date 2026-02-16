import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png'; // تأكد من أن المسار صحيح

const Footer = () => {
    return (
        <footer className="bg-gray-100 text-gray-800 p-8 mt-8">
            {/* الخط الفاصل العلوي */}
            <div className='h-0.5 min-w-full bg-gray-300 mb-4'></div>

            {/* المحتوى الرئيسي للفوتر */}
            <div className="container mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">

                {/* القسم الأول: الروابط المفيدة */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
                    <h2 className="text-lg font-semibold mb-2">روابط مفيدة</h2>
                    <Link to="/contact" className="hover:text-gray-600 transition mb-1">تواصل مع المدراء</Link>
                    <Link to="/support" className="hover:text-gray-600 transition mb-1">الدعم</Link>
                    <Link to="/developers" className="hover:text-gray-600 transition mb-1">معلومات المطورين</Link>
                    <Link to="/privacy-policy" className="hover:text-gray-600 transition mb-1">سياسة الخصوصية</Link>
                    <Link to="/terms-of-service" className="hover:text-gray-600 transition mb-1">شروط الخدمة</Link>
                </div>

                {/* القسم الثاني: الشعار وروابط التواصل الاجتماعي */}
                <div className="flex flex-col items-center">
                    {/* الشعار */}
                    <img src={logo} alt="Logo" className="h-24 md:h-32 mb-4" />

                    {/* عنوان */}
                    <h2 className="text-lg font-semibold mb-2">تابعنا على</h2>

                    {/* روابط التواصل الاجتماعي */}
                    <div className="flex space-x-4">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition">فيسبوك</a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition">تويتر</a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition">إنستغرام</a>
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition">لينكدإن</a>
                    </div>
                </div>
            </div>

            {/* حقوق النشر */}
            <div className="text-center mt-4">
                <p className="text-sm">حقوق النشر © 2024 أسامة بيطار. جميع الحقوق محفوظة.</p>
            </div>
        </footer>
    );
};

export default Footer;
