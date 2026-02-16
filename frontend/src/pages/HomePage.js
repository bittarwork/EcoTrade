import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    ShieldCheckIcon, 
    LightningBoltIcon, 
    ChartBarIcon, 
    ChatAltIcon,
    CurrencyDollarIcon,
    UserGroupIcon,
    TrendingUpIcon,
    CheckCircleIcon,
    SparklesIcon,
    GlobeAltIcon,
    HeartIcon,
    BadgeCheckIcon
} from '@heroicons/react/outline';
import { StarIcon } from '@heroicons/react/solid';
import osama from "../assets/images/osama.png"

const HomePage = () => {
    const [counter, setCounter] = useState({ users: 0, transactions: 0, savings: 0 });

    // Animated counter effect
    useEffect(() => {
        const timer = setInterval(() => {
            setCounter(prev => ({
                users: prev.users < 5000 ? prev.users + 50 : 5000,
                transactions: prev.transactions < 10000 ? prev.transactions + 100 : 10000,
                savings: prev.savings < 2500 ? prev.savings + 25 : 2500
            }));
        }, 30);

        return () => clearInterval(timer);
    }, []);

    const features = [
        {
            icon: LightningBoltIcon,
            title: "سرعة فائقة",
            description: "إنشاء وإدارة طلباتك في ثوانٍ معدودة",
            color: "from-yellow-400 to-orange-500",
            bgColor: "bg-yellow-50"
        },
        {
            icon: ShieldCheckIcon,
            title: "أمان متقدم",
            description: "حماية كاملة لبياناتك ومعاملاتك",
            color: "from-blue-400 to-indigo-500",
            bgColor: "bg-blue-50"
        },
        {
            icon: ChartBarIcon,
            title: "مزادات مباشرة",
            description: "شارك في مزادات حقيقية بوقت فعلي",
            color: "from-green-400 to-teal-500",
            bgColor: "bg-green-50"
        },
        {
            icon: ChatAltIcon,
            title: "دعم فوري",
            description: "تواصل سريع مع فريقنا المتخصص",
            color: "from-purple-400 to-pink-500",
            bgColor: "bg-purple-50"
        }
    ];

    const steps = [
        {
            number: "01",
            title: "أنشئ حسابك",
            description: "سجل مجاناً في دقائق معدودة",
            icon: UserGroupIcon
        },
        {
            number: "02",
            title: "أضف طلبك",
            description: "حدد نوع المواد والكمية المطلوبة",
            icon: SparklesIcon
        },
        {
            number: "03",
            title: "احصل على عروض",
            description: "استقبل عروض أسعار من مشترين متعددين",
            icon: CurrencyDollarIcon
        },
        {
            number: "04",
            title: "أتمم الصفقة",
            description: "اختر أفضل عرض وأكمل عملية البيع",
            icon: CheckCircleIcon
        }
    ];

    const testimonials = [
        {
            name: "أحمد محمد",
            role: "صاحب مصنع",
            text: "منصة رائعة ساعدتني في بيع مخلفات المصنع بأسعار ممتازة وبسرعة كبيرة",
            rating: 5,
            avatar: "https://ui-avatars.com/api/?name=Ahmed+Mohamed&background=16a34a&color=fff"
        },
        {
            name: "سارة خالد",
            role: "مشترية خردة",
            text: "التعامل مع EcoTrade سهل وآمن، وجدت الكثير من الفرص الجيدة",
            rating: 5,
            avatar: "https://ui-avatars.com/api/?name=Sara+Khaled&background=0891b2&color=fff"
        },
        {
            name: "محمود علي",
            role: "مستثمر",
            text: "أفضل منصة للاستثمار في إعادة التدوير، عوائد ممتازة وإدارة احترافية",
            rating: 5,
            avatar: "https://ui-avatars.com/api/?name=Mahmoud+Ali&background=8b5cf6&color=fff"
        }
    ];

    return (
        <div className="min-h-screen bg-white" dir='rtl'>
            
            {/* Hero Section - Modern Animated */}
            <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-teal-500 to-blue-500 text-white">
                {/* Animated Background Shapes */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-700"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                <SparklesIcon className="w-5 h-5" />
                                <span className="text-sm font-medium">منصة إعادة التدوير الأولى في سوريا</span>
                            </div>
                            
                            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                                حوّل خردتك إلى
                                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                                    ذهب حقيقي
                                </span>
                            </h1>
                            
                            <p className="text-xl md:text-2xl text-green-50 leading-relaxed">
                                انضم إلى آلاف المستخدمين الذين يستفيدون من منصتنا لبيع وشراء المواد المعاد تدويرها بأفضل الأسعار
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    to="/register"
                                    className="group bg-white text-green-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-50 transition-all transform hover:scale-105 shadow-2xl flex items-center justify-center gap-2"
                                >
                                    <span>ابدأ الآن مجاناً</span>
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </Link>
                                <Link
                                    to="/developers"
                                    className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                                >
                                    <GlobeAltIcon className="w-6 h-6" />
                                    <span>اكتشف المزيد</span>
                                </Link>
                            </div>

                            {/* Trust Badges */}
                            <div className="flex items-center gap-6 pt-6">
                                <div className="flex items-center gap-2">
                                    <BadgeCheckIcon className="w-8 h-8 text-yellow-300" />
                                    <div>
                                        <p className="text-sm text-green-100">موثق ومعتمد</p>
                                        <p className="text-xs text-green-200">من الجهات الرسمية</p>
                                    </div>
                                </div>
                                <div className="h-12 w-px bg-white/20"></div>
                                <div className="flex items-center gap-2">
                                    <ShieldCheckIcon className="w-8 h-8 text-blue-300" />
                                    <div>
                                        <p className="text-sm text-green-100">حماية كاملة</p>
                                        <p className="text-xs text-green-200">لجميع المعاملات</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Content - Animated Card */}
                        <div className="relative hidden md:block">
                            <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
                                <div className="absolute -top-6 -right-6 w-32 h-32 bg-yellow-400 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-400 rounded-full blur-2xl opacity-50 animate-pulse delay-1000"></div>
                                
                                <div className="relative space-y-6">
                                    <div className="flex items-center justify-between p-4 bg-white/90 rounded-2xl shadow-lg">
                                        <div>
                                            <p className="text-sm text-gray-600">إجمالي المعاملات</p>
                                            <p className="text-3xl font-bold text-green-600">{counter.transactions.toLocaleString()}</p>
                                        </div>
                                        <TrendingUpIcon className="w-12 h-12 text-green-500" />
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-white/90 rounded-2xl shadow-lg">
                                        <div>
                                            <p className="text-sm text-gray-600">مستخدم نشط</p>
                                            <p className="text-3xl font-bold text-blue-600">{counter.users.toLocaleString()}+</p>
                                        </div>
                                        <UserGroupIcon className="w-12 h-12 text-blue-500" />
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-white/90 rounded-2xl shadow-lg">
                                        <div>
                                            <p className="text-sm text-gray-600">توفير بيئي (طن)</p>
                                            <p className="text-3xl font-bold text-purple-600">{counter.savings.toLocaleString()}</p>
                                        </div>
                                        <HeartIcon className="w-12 h-12 text-purple-500" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Wave Divider */}
                <div className="absolute bottom-0 left-0 w-full">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z" fill="white"/>
                    </svg>
                </div>
            </section>

            {/* Features Section - Modern Cards */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-semibold mb-4">
                        ميزاتنا المتقدمة
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        لماذا نحن الخيار الأفضل؟
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        نقدم لك تجربة فريدة ومميزة في عالم إعادة التدوير
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden"
                        >
                            {/* Gradient Background on Hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                            
                            {/* Icon */}
                            <div className={`relative ${feature.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <feature.icon className={`w-8 h-8 text-gray-700`} />
                            </div>
                            
                            {/* Content */}
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            
                            {/* Arrow Icon */}
                            <div className="mt-4 flex items-center text-green-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="text-sm">اعرف المزيد</span>
                                <svg className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* How It Works Section */}
            <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
                            كيف تعمل المنصة
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            ابدأ في 4 خطوات بسيطة
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            عملية سهلة وسريعة للبدء في رحلتك مع إعادة التدوير
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                        {/* Connection Lines - Hidden on mobile */}
                        <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-green-300 via-blue-300 to-purple-300 z-0" style={{ width: 'calc(100% - 8rem)', margin: '0 4rem' }}></div>
                        
                        {steps.map((step, index) => (
                            <div key={index} className="relative z-10">
                                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                                    {/* Step Number */}
                                    <div className="relative mb-6">
                                        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                                            <span className="text-3xl font-bold text-white">{step.number}</span>
                                        </div>
                                    </div>
                                    
                                    {/* Icon */}
                                    <div className="flex justify-center mb-4">
                                        <div className="bg-green-50 w-14 h-14 rounded-xl flex items-center justify-center">
                                            <step.icon className="w-7 h-7 text-green-600" />
                                        </div>
                                    </div>
                                    
                                    {/* Content */}
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{step.title}</h3>
                                    <p className="text-gray-600 text-center leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold mb-4">
                        آراء عملائنا
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        ماذا يقول مستخدمونا؟
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        انضم إلى آلاف العملاء الراضين عن خدماتنا
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                        >
                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                                ))}
                            </div>
                            
                            {/* Quote */}
                            <p className="text-gray-700 leading-relaxed mb-6 italic">
                                "{testimonial.text}"
                            </p>
                            
                            {/* User Info */}
                            <div className="flex items-center gap-4">
                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full"
                                />
                                <div>
                                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Environmental Impact - Visual Section */}
            <section className="relative bg-gradient-to-br from-green-900 via-teal-800 to-blue-900 text-white py-20 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-4">
                            تأثيرنا البيئي
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            معاً نصنع الفرق
                        </h2>
                        <p className="text-xl text-green-100 max-w-3xl mx-auto">
                            كل معاملة على منصتنا تساهم في حماية كوكبنا للأجيال القادمة
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-400 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </div>
                            <h3 className="text-3xl font-bold mb-2 text-center">2,500+ طن</h3>
                            <p className="text-green-100 text-center">من النفايات تم إعادة تدويرها</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-3xl font-bold mb-2 text-center">15,000+ شجرة</h3>
                            <p className="text-green-100 text-center">تم إنقاذها من القطع</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                                <HeartIcon className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-3xl font-bold mb-2 text-center">50,000+ طن</h3>
                            <p className="text-green-100 text-center">تقليل انبعاثات CO₂</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technology Section - Modern */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
                        التقنيات المستخدمة
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        تقنيات عالمية حديثة
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        نستخدم أحدث التقنيات لضمان أفضل تجربة مستخدم
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { name: 'React.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: 'from-cyan-400 to-blue-500' },
                        { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', color: 'from-green-400 to-green-600' },
                        { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', color: 'from-green-500 to-green-700' },
                        { name: 'Express.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', color: 'from-gray-600 to-gray-800' }
                    ].map((tech, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center"
                        >
                            <div className="relative mb-6">
                                <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300`}></div>
                                <img
                                    src={tech.logo}
                                    alt={tech.name}
                                    className="relative w-20 h-20 mx-auto group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">{tech.name}</h3>
                        </div>
                    ))}
                </div>
            </section>

            {/* Developer Section - Solo */}
            <section className="bg-gradient-to-br from-gray-50 to-white py-20">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-semibold mb-4">
                            المطور
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            مبتكر المنصة
                        </h2>
                    </div>

                    <div className="relative">
                        {/* Decorative Elements */}
                        <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-green-400 to-teal-500 rounded-full blur-2xl opacity-20"></div>
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-2xl opacity-20"></div>
                        
                        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
                            <div className="grid md:grid-cols-5 gap-8 p-8 md:p-12">
                                {/* Image Section */}
                                <div className="md:col-span-2 flex justify-center items-center">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-teal-500 rounded-full blur-lg opacity-50"></div>
                                        <img
                                            src={osama}
                                            alt="أسامة بيطار"
                                            className="relative w-48 h-48 rounded-full border-4 border-white shadow-2xl object-cover"
                                        />
                                        {/* Badge */}
                                        <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-green-600 to-teal-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                                            <BadgeCheckIcon className="w-5 h-5" />
                                            <span className="text-sm font-bold">مطور رئيسي</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Info Section */}
                                <div className="md:col-span-3 flex flex-col justify-center">
                                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                        أسامة بيطار
                                    </h3>
                                    <p className="text-xl text-green-600 font-semibold mb-4">
                                        Full Stack Developer
                                    </p>
                                    <p className="text-gray-600 leading-relaxed mb-6">
                                        مطور محترف متخصص في تطوير تطبيقات الويب الحديثة باستخدام تقنيات MERN Stack. 
                                        شغوف بإنشاء حلول مبتكرة للمشاكل البيئية والاستدامة.
                                    </p>
                                    
                                    {/* Education */}
                                    <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-4 mb-6">
                                        <p className="text-gray-700 font-medium flex items-center gap-2">
                                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                            </svg>
                                            كلية هندسة المعلوماتية - الجامعة السورية الافتراضية
                                        </p>
                                    </div>

                                    {/* Skills */}
                                    <div className="flex flex-wrap gap-2">
                                        {['React.js', 'Node.js', 'MongoDB', 'Express.js', 'Tailwind CSS'].map((skill, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-gradient-to-r from-green-100 to-teal-100 text-green-700 rounded-full text-sm font-medium"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section - Final */}
            <section className="relative bg-gradient-to-br from-green-600 via-teal-500 to-blue-500 text-white py-20 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10">
                        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
                    </div>
                </div>

                <div className="relative max-w-5xl mx-auto px-6 text-center">
                    <div className="mb-8">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
                            <SparklesIcon className="w-6 h-6" />
                            <span className="font-semibold">انضم إلينا الآن</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold mb-6">
                            ابدأ رحلتك نحو
                            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                                مستقبل أخضر
                            </span>
                        </h2>
                        <p className="text-xl md:text-2xl text-green-50 mb-8 max-w-3xl mx-auto">
                            انضم إلى آلاف المستخدمين الذين يحققون أرباحاً ويساهمون في حماية البيئة
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <Link
                            to="/register"
                            className="group bg-white text-green-600 px-10 py-5 rounded-xl font-bold text-xl hover:bg-green-50 transition-all transform hover:scale-105 shadow-2xl flex items-center justify-center gap-3"
                        >
                            <UserGroupIcon className="w-7 h-7" />
                            <span>سجل مجاناً الآن</span>
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </Link>
                        <Link
                            to="/contact"
                            className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-10 py-5 rounded-xl font-bold text-xl hover:bg-white/20 transition-all flex items-center justify-center gap-3"
                        >
                            <ChatAltIcon className="w-7 h-7" />
                            <span>تواصل معنا</span>
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <p className="text-4xl font-bold mb-2">5K+</p>
                            <p className="text-green-100">مستخدم نشط</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <p className="text-4xl font-bold mb-2">10K+</p>
                            <p className="text-green-100">معاملة ناجحة</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <p className="text-4xl font-bold mb-2">2.5K+</p>
                            <p className="text-green-100">طن معاد تدويره</p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default HomePage;
