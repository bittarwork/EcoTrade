// src/components/Layout.js
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <main className="flex-grow p-6">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
