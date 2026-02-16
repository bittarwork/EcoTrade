// src/pages/Termofuse.js
// Terms of Service page with enhanced UI/UX - hero, navigation, cards, and smooth UX
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DocumentTextIcon, MailIcon } from '@heroicons/react/solid';

// Section data for table of contents and content
const SECTIONS = [
  { id: 'intro', title: 'مقدمة', icon: '📋' },
  { id: 'usage', title: 'استخدام الخدمات', icon: '✅' },
  { id: 'account', title: 'التسجيل والحساب', icon: '👤' },
  { id: 'changes', title: 'التغييرات على الخدمة', icon: '🔄' },
  { id: 'liability', title: 'التعويض والمسؤولية', icon: '⚖️' },
  { id: 'updates', title: 'التعديلات على الشروط', icon: '📝' },
  { id: 'contact', title: 'التواصل', icon: '✉️' },
];

const Termofuse = () => {
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
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative max-w-5xl mx-auto px-6 py-16 sm:py-24">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center animate-fadeIn">
              <DocumentTextIcon className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                شروط الخدمة
              </h1>
              <p className="text-blue-100 text-lg max-w-2xl animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                من خلال استخدامك لموقع EcoTrade، فإنك توافق على الالتزام بالشروط والأحكام التالية. يرجى قراءة هذه الشروط بعناية قبل استخدام الموقع.
              </p>
              <p className="text-blue-200 text-sm mt-4 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
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
                          ? 'bg-indigo-100 text-indigo-800 border-r-3 border-indigo-600'
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
                  من خلال استخدامك لموقع EcoTrade، فإنك توافق على الالتزام بالشروط والأحكام التالية. يرجى قراءة هذه الشروط بعناية قبل استخدام الموقع.
                </p>
              </div>
            </section>

            {/* Usage */}
            <section id="usage" className="scroll-mt-24">
              <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-xl border border-slate-200/60 card-hover">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">✅</span>
                  <h2 className="text-2xl font-bold text-slate-800">استخدام الخدمات</h2>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  تلتزم باستخدام الموقع والخدمات المقدمة لأغراض مشروعة وبما يتفق مع القوانين والأنظمة السارية. يحظر عليك إساءة استخدام الخدمات أو محاولة الوصول غير المصرح به.
                </p>
              </div>
            </section>

            {/* Account */}
            <section id="account" className="scroll-mt-24">
              <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-xl border border-slate-200/60 card-hover">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">👤</span>
                  <h2 className="text-2xl font-bold text-slate-800">التسجيل والحساب</h2>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  يجب أن تكون المعلومات المقدمة عند التسجيل دقيقة وحديثة. تحتفظ EcoTrade بالحق في إنهاء حسابك في حالة تقديم معلومات غير صحيحة أو مخالفة الشروط.
                </p>
              </div>
            </section>

            {/* Changes */}
            <section id="changes" className="scroll-mt-24">
              <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-xl border border-slate-200/60 card-hover">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🔄</span>
                  <h2 className="text-2xl font-bold text-slate-800">التغييرات على الخدمة</h2>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  قد تقوم EcoTrade بتحديث أو تعديل أو إيقاف جزء من الخدمات في أي وقت دون إشعار مسبق. لن نكون مسؤولين عن أي تأثير قد يحدث نتيجة لهذه التغييرات.
                </p>
              </div>
            </section>

            {/* Liability */}
            <section id="liability" className="scroll-mt-24">
              <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-xl border border-slate-200/60 card-hover">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">⚖️</span>
                  <h2 className="text-2xl font-bold text-slate-800">التعويض والمسؤولية</h2>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  باستخدامك لخدماتنا، توافق على تعويض EcoTrade عن أي مطالبات أو خسائر قد تنشأ نتيجة لإساءة الاستخدام أو مخالفة الشروط.
                </p>
              </div>
            </section>

            {/* Updates */}
            <section id="updates" className="scroll-mt-24">
              <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-xl border border-slate-200/60 card-hover">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">📝</span>
                  <h2 className="text-2xl font-bold text-slate-800">التعديلات على الشروط</h2>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  قد يتم تحديث شروط الخدمة بشكل دوري. استمرارك في استخدام الموقع بعد التعديلات يعني موافقتك على الشروط المعدلة.
                </p>
              </div>
            </section>

            {/* Contact CTA */}
            <section id="contact" className="scroll-mt-24">
              <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 p-6 sm:p-8 border-2 border-indigo-200/60">
                <div className="flex items-center gap-3 mb-4">
                  <MailIcon className="w-8 h-8 text-indigo-600" />
                  <h2 className="text-2xl font-bold text-slate-800">تواصل معنا</h2>
                </div>
                <p className="text-slate-600 leading-relaxed mb-6">
                  إذا كان لديك أي استفسارات حول شروط الخدمة، يُرجى الاتصال بنا عبر البريد الإلكتروني:
                </p>
                <a
                  href="mailto:support@ecotrade.com"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <MailIcon className="w-5 h-5" />
                  support@ecotrade.com
                </a>
                <div className="mt-6 pt-6 border-t border-indigo-200/60">
                  <Link
                    to="/support"
                    className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
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

export default Termofuse;
