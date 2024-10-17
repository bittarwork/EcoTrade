import React from 'react';
import logo from "../assets/images/logo.png"
const HomePage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100" dir='rtl'>
            <header className="relative w-full py-8 text-center">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://img.freepik.com/premium-photo/recycling-nature-logo-with-plants-concept-recycling-reuse-environmental-ecological-conservation-generative-ai_853928-198.jpg')" }}
                ></div>
                <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay to darken the background */}
                <div className="relative z-10 text-white">
                    <h1 className="text-5xl font-bold">مرحبًا بكم في <br /> EcoTrade</h1>
                    <p className="text-lg mt-4">
                        نحن هنا لنقدم لكم تجربة فريدة ومبتكرة في عالم إعادة التدوير، حيث نسهّل عليكم بيع الخردة بطريقة سهلة وفعالة.
                        في EcoTrade، نؤمن بأن كل قطعة خردة يمكن أن تكون فرصة جديدة، ونسعى معًا لبناء مستقبل مستدام.
                    </p>
                    <p className="text-md mt-2">
                        انضموا إلينا اليوم وكونوا جزءًا من الحل، مع EcoTrade نحن نعيد التدوير، ونحافظ على البيئة، ونحقق الربح معًا.
                    </p>
                </div>
            </header>


            <section className="max-w-6xl w-full mx-auto p-6 bg-white rounded-lg mt-8 flex flex-col gap-x-2 md:flex-row">
                {/* قسم المعلومات */}
                <div className="md:w-2/3">
                    <h2 className="text-4xl font-semibold text-green-600">ميزات EcoTrade المتميزة</h2>
                    <p className="mt-4 text-gray-700">
                        في EcoTrade، نقدم مجموعة متكاملة من الميزات التي تجعل تجربتك في إعادة التدوير سهلة وفعالة. إليك ما يميزنا:
                    </p>
                    <ul className="mt-4 list-disc list-inside text-gray-700">
                        <li className="mt-2">
                            <strong>طلبات سهلة:</strong> ابدأ رحلتك في بيع الخردة عبر منصة بسيطة وسلسة. يمكنك إنشاء طلبات لبيع الخردة الخاصة بك بضغطة زر، مع إمكانية تتبع حالة طلبك في أي وقت.
                        </li>
                        <li className="mt-2">
                            <strong>مزادات مثيرة:</strong> استمتع بالدخول إلى مزادات تضم مجموعة متنوعة من المواد. يمكنك الاطلاع على تفاصيل دقيقة حول كل مزاد، بما في ذلك تاريخ البدء والانتهاء والسعر الابتدائي.
                        </li>
                        <li className="mt-2">
                            <strong>تواصل مباشر وفعال:</strong> لدينا نظام رسائل متكامل يتيح لك التواصل بسهولة مع مدراء الشركة، لضمان تلبية جميع استفساراتك واحتياجاتك في أسرع وقت ممكن.
                        </li>
                        <li className="mt-2">
                            <strong>تحليلات بيانات شاملة:</strong> استخدم تحليلات البيانات المتقدمة لفهم توجهات السوق واتخاذ قرارات مستنيرة، مما يمنحك ميزة تنافسية في مجال إعادة التدوير.
                        </li>
                    </ul>
                    <p className="mt-4 text-gray-700">
                        نحن في EcoTrade ملتزمون بتقديم أفضل تجربة مستخدم، حيث نؤمن بأن كل عملية بيع لخردة تمثل خطوة نحو مستقبل أفضل. انضم إلينا اليوم وكن جزءًا من التغيير!
                    </p>
                </div>

                {/* قسم الصورة */}
                <div className="md:w-1/3 mt-4 md:mt-0">
                    <img
                        src={logo} // استخدم الرابط المباشر للصورة التوضيحية هنا
                        alt="EcoTrade Features"
                        className="w-full h-auto"
                    />
                </div>
            </section>

            <section className="max-w-6xl mx-auto p-6 gap-x-2 bg-white rounded-lg mt-8 flex flex-col md:flex-row">
                {/* قسم المعلومات */}
                <div className="md:w-2/3">
                    <h2 className="text-3xl font-semibold text-green-600">فوائد إعادة التدوير</h2>
                    <p className="mt-4 text-gray-700">
                        تُعد إعادة التدوير واحدة من أكثر الطرق فعاليةً للحفاظ على البيئة والمساهمة في استدامة كوكبنا. من خلال هذه العملية، يمكننا تقليل النفايات التي تُلقى في المكبات وتحسين جودة الحياة على الأرض.
                    </p>
                    <p className="mt-2 text-gray-700">
                        <strong>تقليل النفايات:</strong> عندما نعيد تدوير المواد، نقلل من كمية النفايات التي تنتهي في المكبات، مما يساعد في تقليل ضغط النفايات على البيئة. هذا يُعني أن المساحات التي تُستخدم كمدافن للنفايات يمكن أن تُستغل لزراعة الأشجار أو إنشاء حدائق عامة، مما يُساهم في تحسين المناظر الطبيعية.
                    </p>
                    <p className="mt-2 text-gray-700">
                        <strong>الحفاظ على الموارد الطبيعية:</strong> عملية إعادة التدوير تعني استخدام المواد الموجودة بدلاً من استخراج مواد جديدة. على سبيل المثال، إعادة تدوير الورق تقلل الحاجة لقطع الأشجار، مما يُساعد في الحفاظ على الغابات والحياة البرية. كما تساهم إعادة تدوير المعادن في تقليل الحاجة لاستخراج المعادن من باطن الأرض.
                    </p>
                    <p className="mt-4 text-gray-700">
                        من خلال مشاركتك معنا في EcoTrade، يمكنك أن تكون جزءًا من هذه العملية الإيجابية والمساهمة في خلق مستقبل أكثر استدامة. انضم إلينا اليوم وكن جزءًا من الحل!
                    </p>
                </div>

                {/* قسم الصورة */}
                <div className="md:w-1/3 mt-4 md:mt-0">
                    <img
                        src="https://safetysigns.ie/cdn/shop/collections/recycling_600x600.png?v=1649417797" // استخدم الرابط المباشر للصورة التوضيحية هنا
                        alt="Benefits of Recycling"
                        className="w-full h-auto rounded-2xl shadow-lg"
                    />
                </div>
            </section>


            <section className="max-w-6xl mx-auto p-6 bg-white  rounded-lg mt-8">
                <h2 className="text-3xl font-semibold text-green-600">الشركات المشاركة والداعمة</h2>
                <p className="mt-4 text-gray-700">
                    نحن فخورون بشراكتنا مع عدة شركات رائدة في مجال إعادة التدوير، مما يعزز من قدراتنا ويوفر لك أفضل الخدمات الممكنة. هذه الشراكات لا تُعزز فقط من كفاءة عملياتنا، بل تسهم أيضًا في نشر الوعي حول أهمية إعادة التدوير ودورها في الحفاظ على البيئة.
                </p>
                <p className="mt-2 text-gray-700">
                    من خلال التعاون مع هذه الشركات، نستطيع أن نضمن لك أفضل الأسعار وأعلى جودة في خدماتنا. كما أن لدينا التزام مشترك نحو الابتكار والتطوير المستمر في مجال إعادة التدوير، مما يضمن لك تجربة مميزة وفعالة.
                </p>

                <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="flex flex-col items-center">
                        <img src="https://via.placeholder.com/100" alt="شعار الشركة 1" className="h-16" />
                        <span className="mt-2 text-gray-600">اسم الشركة 1</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src="https://via.placeholder.com/100" alt="شعار الشركة 2" className="h-16" />
                        <span className="mt-2 text-gray-600">اسم الشركة 2</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src="https://via.placeholder.com/100" alt="شعار الشركة 3" className="h-16" />
                        <span className="mt-2 text-gray-600">اسم الشركة 3</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src="https://via.placeholder.com/100" alt="شعار الشركة 4" className="h-16" />
                        <span className="mt-2 text-gray-600">اسم الشركة 4</span>
                    </div>
                </div>

                <p className="mt-4 text-gray-700">
                    إننا نؤمن بأن الشراكة مع هذه الشركات الرائدة ليس فقط تعبيرًا عن قوتنا، بل هو أيضًا خطوة نحو تحقيق رؤية مشتركة لتحقيق بيئة أنظف وأكثر استدامة. انضموا إلينا في هذه الرحلة واستفادوا من الخدمات المتميزة التي نقدمها بفضل شراكاتنا الاستراتيجية!
                </p>
            </section>

            <section className="max-w-6xl mx-auto p-6 bg-white rounded-lg mt-8">
                <h2 className="text-3xl font-semibold text-green-600">التقنيات المستخدمة</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div>
                        <img
                            src="https://via.placeholder.com/400x200" // صورة placeholder
                            alt="التقنيات المستخدمة"
                            className="w-full h-48 object-cover rounded-lg"
                        />
                        <p className="mt-4 text-gray-700">
                            يعتمد موقع EcoTrade على تقنيات MERN Stack (MongoDB, Express.js, React.js, Node.js) لتوفير تجربة مستخدم سلسة وفعالة، مما يعزز من قدرتنا على تقديم مجموعة متنوعة من الميزات التي تضمن الأمان، السرعة، والكفاءة.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-green-500">MongoDB</h3>
                        <img
                            src="https://via.placeholder.com/400x200" // صورة placeholder
                            alt="MongoDB"
                            className="w-full h-48 object-cover rounded-lg mt-4"
                        />
                        <p className="mt-2 text-gray-700">
                            تعتبر MongoDB قاعدة بيانات NoSQL مرنة وقوية، تتيح لنا تخزين كميات هائلة من البيانات بشكل آمن وفعال. بفضل تصميمها القائم على الوثائق، يمكننا إدارة بيانات المستخدمين والطلبات والمزادات بسهولة، مما يضمن الوصول السريع والفعال إلى المعلومات. كما أن استخدام MongoDB يمكننا من تنفيذ عمليات النسخ الاحتياطي بسهولة وضمان عدم فقدان أي بيانات مهمة.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                        <h3 className="text-xl font-semibold text-green-500">Express.js</h3>
                        <img
                            src="https://via.placeholder.com/400x200" // صورة placeholder
                            alt="Express.js"
                            className="w-full h-48 object-cover rounded-lg mt-4"
                        />
                        <p className="mt-2 text-gray-700">
                            يعمل Express.js كإطار عمل لتطبيقات Node.js، مما يسهل بناء واجهات برمجة التطبيقات (APIs) بشكل سريع ومباشر. بفضل قدرته على التعامل مع الطلبات والاستجابات بشكل فعّال، يضمن Express.js سرعة تحميل الصفحات وتقليل زمن الاستجابة، مما يعزز من تجربة المستخدم. كذلك، يوفر Express.js ميزات أمان متقدمة، مثل حماية البيانات ومنع هجمات XSS وCSRF، مما يحافظ على سلامة المعلومات الشخصية للمستخدمين.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-green-500">React.js</h3>
                        <img
                            src="https://via.placeholder.com/400x200" // صورة placeholder
                            alt="React.js"
                            className="w-full h-48 object-cover rounded-lg mt-4"
                        />
                        <p className="mt-2 text-gray-700">
                            تعتبر React.js حجر الزاوية في واجهة المستخدم لدينا، حيث توفر تجربة تفاعلية وسريعة. تعمل React.js على تحسين أداء الموقع من خلال تقنيات مثل Virtual DOM، مما يضمن تحديث الصفحات بكفاءة ودون تأخير. تتيح لنا مرونة React.js أيضًا تطوير ميزات جديدة بسرعة، مما يمكننا من تلبية احتياجات المستخدمين المتغيرة. كما تسهل React.js بناء واجهات مستخدم متجاوبة، مما يجعل الموقع متاحًا عبر جميع الأجهزة، من الهواتف الذكية إلى أجهزة الكمبيوتر المكتبية.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                        <h3 className="text-xl font-semibold text-green-500">Node.js</h3>
                        <img
                            src="https://via.placeholder.com/400x200" // صورة placeholder
                            alt="Node.js"
                            className="w-full h-48 object-cover rounded-lg mt-4"
                        />
                        <p className="mt-2 text-gray-700">
                            تعمل Node.js كخادم فعال وقوي يتيح لنا تشغيل كود JavaScript على الخادم. بفضل بنيتها القائمة على الأحداث، يمكن لـ Node.js معالجة عدد كبير من الاتصالات المتزامنة بكفاءة، مما يضمن سرعة استجابة الموقع حتى في أوقات الذروة. هذه الكفاءة تساهم في تقديم تجربة مستخدم ممتازة، حيث يمكن للمستخدمين إنشاء الطلبات والمزادات في أي وقت دون أي تأخير. بالإضافة إلى ذلك، يوفر Node.js أمانًا قويًا بفضل نظام إدارة الحزم npm، مما يتيح لنا دمج مكتبات أمان متقدمة بسهولة.
                        </p>
                    </div>

                    <div className="flex flex-col justify-between">
                        <p className="mt-4 text-gray-700">
                            من خلال هذه التقنيات المتطورة، يلتزم EcoTrade بتقديم منصة آمنة وسريعة وموثوقة تساهم في تعزيز عملية إعادة التدوير وتقديم خدمات عالية الجودة للمستخدمين. نحن نؤمن بأن التكنولوجيا هي المفتاح لتحقيق مستقبل مستدام، ونسعى جاهدين لضمان أفضل تجربة ممكنة لكل من يستخدم منصتنا. انضموا إلينا اليوم لتكونوا جزءًا من هذا التحول المبتكر في عالم إعادة التدوير!
                        </p>
                    </div>
                </div>
            </section>

            <footer className="mt-8">
                <h3 className="text-lg font-semibold text-green-600 mb-4 text-center">تم تطوير EcoTrade بواسطة:</h3>
                <div className="flex flex-col gap-x-5 md:flex-row justify-around items-center">
                    <div className="flex flex-col items-center mb-4 md:mb-0">
                        <img
                            src="https://example.com/image1.jpg"
                            alt="محمدم أسامة"
                            className="w-32 h-32 rounded-full border-2 border-green-600"
                        />
                        <p className="text-gray-600 mt-2">محمدم أسامة</p>
                    </div>

                    <div className="flex flex-col items-center mb-4 md:mb-0">
                        <img
                            src="https://example.com/image3.jpg"
                            alt="عمار شامية"
                            className="w-32 h-32 rounded-full border-2 border-green-600"
                        />
                        <p className="text-gray-600 mt-2">عمار شامية</p>
                    </div>

                    <div className="flex flex-col items-center mb-4 md:mb-0">
                        <img
                            src="https://example.com/image4.jpg"
                            alt="عمر سقر"
                            className="w-32 h-32 rounded-full border-2 border-green-600"
                        />
                        <p className="text-gray-600 mt-2">عمر سقر</p>
                    </div>
                </div>
                <p className="text-gray-600 mt-4 text-center">طلاب كلية هندسة المعلوماتية - الجامعة السورية الافتراضية</p>
            </footer>


        </div>
    );
};

export default HomePage;
