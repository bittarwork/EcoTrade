// src/pages/DevelopersPage.js
import React from 'react';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import omar from "../assets/images/omar.jpg"
import osama from "../assets/images/osama.png"
import ammar from "../assets/images/ammar.jpg"
const DevelopersPage = () => {
    return (
        <div className="p-6 bg-white shadow-md rounded-lg max-w-5xl mx-auto mt-10 text-right" dir='rtl'>
            <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">عن المطورين</h1>

            {/* محمد بيطار */}
            <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">محمد أسامة محمد زياد بيطار</h2>
                <div className="flex flex-col md:flex-row items-center md:items-start bg-gray-100 p-6 rounded-lg shadow-md">
                    <div className="md:w-1/4 mb-4 md:mb-0">
                        {/* صورة رمزية */}
                        <img className="w-40 h-40 bg-gray-200 rounded-full mx-auto mb-4 md:mb-0" src={osama} alt="محمد بيطار" />
                    </div>
                    <div className="md:w-3/4">
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            أنا محمد بيطار، مولود في دمشق عام 1999. أدرس هندسة المعلوماتية في الجامعة الافتراضية السورية وأعمل كمطور برمجيات محترف ومدرب في علوم الويب. درّبت في العديد من المعاهد السورية، مثل نيو هورايزن والحضارة، وأعمل أيضًا كمدرب على منصات افتراضية.
                        </p>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            أعمل على العديد من المشاريع البرمجية وأقوم بنشرها على حسابي على GitHub. إذا كنت ترغب في استكشاف أعمالي البرمجية أو التواصل معي مباشرةً، يمكنك الاطلاع على الروابط أدناه:
                        </p>
                        <div className="flex space-x-6 space-x-reverse text-blue-600">
                            <a href="https://github.com/bittarwork" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition-colors duration-300">
                                <FaGithub className="text-2xl" />
                            </a>
                            <a href="mailto:bittar.work@gmail.com" className="hover:text-blue-700 transition-colors duration-300">
                                <FaEnvelope className="text-2xl" />
                            </a>
                            <a href="https://www.linkedin.com/in/yourlinkedinprofile" className="hover:text-blue-700 transition-colors duration-300">
                                <FaLinkedin className="text-2xl" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* عمر سقر */}
            <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">عمر سقر</h2>
                <div className="flex flex-col md:flex-row items-center md:items-start bg-gray-100 p-6 rounded-lg shadow-md">
                    <div className="md:w-1/4 mb-4 md:mb-0">
                        {/* صورة رمزية */}
                        <img className="w-40 h-40 bg-gray-200 rounded-full mx-auto mb-4 md:mb-0" src={omar} alt="عمر سقر" />
                    </div>
                    <div className="md:w-3/4">
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            أنا عمر السقر، مولود في دمشق عام 2000. أدرس هندسة المعلوماتية في الجامعة الافتراضية السورية وأعمل كمطور برمجيات ومسؤول عن منصة تعليم إلكترونية. أعمل أيضًا كمسؤول عن قسم اللغات لدى معهد نيو هورايزون.
                        </p>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            أعمل على العديد من المشاريع البرمجية وأقوم بنشرها على حسابي على GitHub. إذا كنت ترغب في استكشاف أعمالي البرمجية أو التواصل معي مباشرةً، يمكنك الاطلاع على الروابط أدناه:
                        </p>
                        <div className="flex space-x-6 space-x-reverse text-blue-600">
                            <a href="https://github.com/yourgithubprofile" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition-colors duration-300">
                                <FaGithub className="text-2xl" />
                            </a>
                            <a href="mailto:your.email@example.com" className="hover:text-blue-700 transition-colors duration-300">
                                <FaEnvelope className="text-2xl" />
                            </a>
                            <a href="https://www.linkedin.com/in/yourlinkedinprofile" className="hover:text-blue-700 transition-colors duration-300">
                                <FaLinkedin className="text-2xl" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* عمار شامية */}
            <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">عمار شامية</h2>
                <div className="flex flex-col md:flex-row items-center md:items-start bg-gray-100 p-6 rounded-lg shadow-md">
                    <div className="md:w-1/4 mb-4 md:mb-0">
                        {/* صورة رمزية */}
                        <img className="w-40 h-40 bg-gray-200 rounded-full mx-auto mb-4 md:mb-0" src={ammar} alt="عمار شامية" />
                    </div>
                    <div className="md:w-3/4">
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            أنا عمار شامية، مولود في دمشق عام 2003. أدرس الهندسة المعلوماتية في الجامعة الافتراضية السورية وأعمل في مجال بناء تطبيقات الجوال باستخدام لغة دارت بإطار العمل Flutter.
                        </p>
                        <div className="flex space-x-6 space-x-reverse text-blue-600">
                            <a href="https://github.com/yourgithubprofile" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition-colors duration-300">
                                <FaGithub className="text-2xl" />
                            </a>
                            <a href="mailto:your.email@example.com" className="hover:text-blue-700 transition-colors duration-300">
                                <FaEnvelope className="text-2xl" />
                            </a>
                            <a href="https://www.linkedin.com/in/yourlinkedinprofile" className="hover:text-blue-700 transition-colors duration-300">
                                <FaLinkedin className="text-2xl" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DevelopersPage;
