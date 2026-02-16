// src/pages/Privacypolicy.js
// Privacy Policy page with enhanced UI/UX - hero, navigation, cards, and smooth UX
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheckIcon, MailIcon } from '@heroicons/react/solid';

// Section data for table of contents and content
const SECTIONS = [
  { id: 'intro', title: 'مقدمة', icon: '📋' },
  { id: 'collection', title: 'المعلومات التي نجمعها', icon: '📥' },
  { id: 'usage', title: 'كيف نستخدم معلوماتك', icon: '⚙️' },
  { id: 'sharing', title: 'مشاركة المعلومات', icon: '🤝' },
  { id: 'security', title: 'أمان المعلومات', icon: '🔒' },
  { id: 'updates', title: 'التعديلات', icon: '📝' },
  { id: 'contact', title: 'التواصل', icon: '✉️' },
];

const Privacypolicy = () => {
  const [activeSection, setActiveSection] = useState('intro');
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position for active section and sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = SECTIONS.map((s) => document.getElementById(s.id));
      const scrollPos = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i].offsetTop <= scrollPos) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white" dir="rtl">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative max-w-5xl mx-auto px-6 py-16 sm:py-24">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center animate-fadeIn">
              <ShieldCheckIcon className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                سياسة الخصوصية
              </h1>
              <p className="text-emerald-50 text-lg max-w-2xl animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                نحن في EcoTrade نلتزم بحماية خصوصيتك وشفافية التعامل مع بياناتك. اطّلع على تفاصيل جمع واستخدام معلوماتك.
              </p>
              <p className="text-emerald-100 text-sm mt-4 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
                آخر تحديث: 16 Feb 2025
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sticky Table of Contents - Desktop */}
          <aside
            className={`hidden lg:block lg:w-64 flex-shrink-0 transition-all duration-300 ${
              isScrolled ? 'lg:sticky lg:top-24' : ''
            }`}
          >
            <nav className="rounded-xl bg-white/80 backdrop-blur p-4 shadow-lg border border-slate-200/60">
              <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span>محتويات الصفحة</span>
              </h3>
              <ul className="space-y-2">
                {SECTIONS.map(({ id, title, icon }) => (
                  <li key={id}>
                    <button
                      onClick={() => scrollToSection(id)}
                      className={`w-full text-right flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        activeSection === id
                          ? 'bg-emerald-100 text-emerald-800 border-r-3 border-emerald-600'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <span>{icon}</span>
                      <span>{title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-8">
            {/* Intro */}
            <section id="intro" className="scroll-mt-24">
              <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-xl border border-slate-200/60 card-hover">
                <p className="text-slate-600 leading-relaxed text-lg">
                  تحترم EcoTrade خصوصيتك وتلتزم بحمايتها. توضح هذه السياسة كيفية جمع بياناتك واستخدامها ومشاركتها عندما تتفاعل مع خدماتنا.
                </p>
              </div>
            </section>

            {/* Collection */}
            <section id="collection" className="scroll-mt-24">
              <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-xl border border-slate-200/60 card-hover">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">📥</span>
                  <h2 className="text-2xl font-bold text-slate-800">المعلومات التي نجمعها</h2>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  نحن نجمع المعلومات التي تقدمها عند التسجيل، مثل الاسم، البريد الإلكتروني، والموقع الجغرافي. نستخدم ملفات تعريف الارتباط لجمع المعلومات حول استخدامك للموقع.
                </p>
              </div>
            </section>

            {/* Usage */}
            <section id="usage" className="scroll-mt-24">
              <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-xl border border-slate-200/60 card-hover">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">⚙️</span>
                  <h2 className="text-2xl font-bold text-slate-800">كيف نستخدم معلوماتك</h2>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  تُستخدم معلوماتك لتوفير خدماتنا وتحسين تجربتك. قد نستخدم بياناتك لتحليل استخدام الموقع وتخصيص المحتوى والوظائف.
                </p>
              </div>
            </section>

            {/* Sharing */}
            <section id="sharing" className="scroll-mt-24">
              <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-xl border border-slate-200/60 card-hover">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🤝</span>
                  <h2 className="text-2xl font-bold text-slate-800">مشاركة المعلومات</h2>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  نحن لا نبيع بياناتك الشخصية. قد نشارك بعض المعلومات مع مزودي الخدمات الذين يساعدوننا في تقديم خدماتنا، مع التزامهم بسرية المعلومات.
                </p>
              </div>
            </section>

            {/* Security */}
            <section id="security" className="scroll-mt-24">
              <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-xl border border-slate-200/60 card-hover">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🔒</span>
                  <h2 className="text-2xl font-bold text-slate-800">أمان المعلومات</h2>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  نعمل بجد لحماية بياناتك من الوصول غير المصرح به. نحن نستخدم تدابير أمان مناسبة لضمان حماية بياناتك.
                </p>
              </div>
            </section>

            {/* Updates */}
            <section id="updates" className="scroll-mt-24">
              <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-xl border border-slate-200/60 card-hover">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">📝</span>
                  <h2 className="text-2xl font-bold text-slate-800">التعديلات على سياسة الخصوصية</h2>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  قد نقوم بتحديث هذه السياسة بشكل دوري. يُنصح بمراجعتها بانتظام للبقاء على اطلاع بالتغييرات.
                </p>
              </div>
            </section>

            {/* Contact CTA */}
            <section id="contact" className="scroll-mt-24">
              <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 p-6 sm:p-8 border-2 border-emerald-200/60">
                <div className="flex items-center gap-3 mb-4">
                  <MailIcon className="w-8 h-8 text-emerald-600" />
                  <h2 className="text-2xl font-bold text-slate-800">تواصل معنا</h2>
                </div>
                <p className="text-slate-600 leading-relaxed mb-6">
                  لمزيد من المعلومات حول سياسة الخصوصية، يرجى الاتصال بنا عبر البريد الإلكتروني:
                </p>
                <a
                  href="mailto:support@ecotrade.com"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <MailIcon className="w-5 h-5" />
                  support@ecotrade.com
                </a>
                <div className="mt-6 pt-6 border-t border-emerald-200/60">
                  <Link
                    to="/support"
                    className="text-emerald-600 hover:text-emerald-800 font-medium transition-colors"
                  >
                    ← زيارة صفحة الدعم
                  </Link>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Privacypolicy;
