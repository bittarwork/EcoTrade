// src/pages/DevelopersPage.js
import React from 'react';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';

const DevelopersPage = () => {
    return (
        <div className="p-6 bg-white shadow-md rounded-lg max-w-5xl mx-auto mt-10 text-right" dir='rtl'>
            <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">عن المطورين</h1>

            <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">محمد اسامة محمد زياد بيطار</h2>
                <div className="flex flex-col md:flex-row items-center md:items-start bg-gray-100 p-6 rounded-lg shadow-md">
                    <div className="md:w-1/4 mb-4 md:mb-0">
                        <div className="w-40 h-40 bg-gray-200 rounded-full mx-auto mb-4 md:mb-0"></div>
                    </div>
                    <div className="md:w-3/4">
                        <p className="text-gray-600 mb-4">
                            أنا محمد بيطار، مولود في دمشق عام 1999. أدرس هندسة المعلوماتية في الجامعة الافتراضية السورية وأعمل كمطور برمجيات محترف ومدرب في علوم الويب. درّبت في العديد من المعاهد السورية، مثل نيو هورايزن والحضارة، وأعمل أيضًا كمدرب على منصات افتراضية.
                        </p>
                        <p className="text-gray-600 mb-4">
                            أعمل على العديد من المشاريع البرمجية وأقوم بنشرها على حسابي على GitHub. إذا كنت ترغب في استكشاف أعمالي البرمجية أو التواصل معي مباشرةً، يمكنك الاطلاع على الروابط أدناه:
                        </p>
                        <div className="flex items-center space-x-6 text-blue-600">
                            <a href="https://github.com/bittarwork" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
                                <FaGithub className="text-2xl" />
                            </a>
                            <a href="mailto:bittar.work@gmail.com" className="hover:text-blue-700">
                                <FaEnvelope className="text-2xl" />
                            </a>
                            <a href="mailto:bittar.work@gmail.com" className="hover:text-blue-700">
                                <FaLinkedin className="text-2xl" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">عمر سقر</h2>
                <div className="bg-gray-100 p-6 rounded-lg shadow-md flex items-center justify-center">
                    <p className="text-gray-600">سيتم إضافة المعلومات قريبًا...</p>
                </div>
            </div>

            <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">عمار شامية</h2>
                <div className="bg-gray-100 p-6 rounded-lg shadow-md flex items-center justify-center">
                    <p className="text-gray-600">سيتم إضافة المعلومات قريبًا...</p>
                </div>
            </div>
        </div>
    );
};

export default DevelopersPage;
