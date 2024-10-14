// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import HomePage from './pages/HomePage';
import OrdersPage from './pages/OrdersPage';
import AuctionsPage from './pages/AuctionsPage';
import ContactPage from './pages/ContactPage';
import DevelopersPage from './pages/DevelopersPage';
import LoginPage from './pages/Auth/LoginPage'; // استيراد صفحة تسجيل الدخول
import RegisterPage from './pages/Auth/RegisterPage'; // استيراد صفحة تسجيل الحساب الجديد
import { UserProvider } from './context/UserContext';
import './index.css'; // تأكد من استيراد ملف CSS الخاص بـ Tailwind

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/auctions" element={<AuctionsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/developers" element={<DevelopersPage />} />
            <Route path="/login" element={<LoginPage />} /> {/* إضافة مسار صفحة تسجيل الدخول */}
            <Route path="/register" element={<RegisterPage />} /> {/* إضافة مسار صفحة تسجيل الحساب الجديد */}
          </Routes>
        </Layout>
      </Router>
    </UserProvider>
  );
};

export default App;
