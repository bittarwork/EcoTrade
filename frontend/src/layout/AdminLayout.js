// Admin Layout with Sidebar - Enhanced UI/UX
import React, { useState } from 'react';
import AdminHeader from '../components/admin/AdminHeader';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminFooter from '../components/admin/AdminFooter';

const AdminLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
            {/* Sidebar */}
            <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            {/* Main Content Area */}
            <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'md:mr-64' : 'md:mr-20'}`}>
                {/* Header */}
                <AdminHeader 
                    sidebarOpen={sidebarOpen} 
                    setSidebarOpen={setSidebarOpen} 
                />

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Breadcrumb can be added here */}
                        <div className="mb-4">
                            {/* Content wrapper with animation */}
                            <div className="animate-fadeIn">
                                {children}
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <AdminFooter />
            </div>
        </div>
    );
};

export default AdminLayout;
