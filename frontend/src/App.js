// src/App.js - Enhanced with Admin Layout
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './layout/Layout';
import AdminLayout from './layout/AdminLayout';
import HomePage from './pages/HomePage';
import OrdersPage from './pages/OrdersPage';
import AuctionsPage from './pages/AuctionsPage';
import ContactPage from './pages/ContactPage';
import DevelopersPage from './pages/DevelopersPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import AuctionRoom from './pages/auction/AuctionRoom';
import AdminAuctionRoom from './pages/admin/AdminAuctionRoom';
import { UserProvider } from './context/UserContext';
import UserContext from './context/UserContext';
import Termofuse from "./pages/Termofuse";
import Privacypolicy from './pages/Privacypolicy';
import SupportPage from './pages/SupportPage';
import UserAdmin from './pages/admin/UserAdmin';
import AdminScrapItems from './pages/admin/AdminScrapItems';
import AdminDashboard from './pages/admin/AdminDashboard';
import './index.css';

// Protected Route Component for Admin
const ProtectedAdminRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  
  return <AdminLayout>{children}</AdminLayout>;
};

// Regular Route Component
const RegularRoute = ({ children }) => {
  return <Layout>{children}</Layout>;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes with Regular Layout */}
      <Route path="/" element={<RegularRoute><HomePage /></RegularRoute>} />
      <Route path="/login" element={<RegularRoute><LoginPage /></RegularRoute>} />
      <Route path="/register" element={<RegularRoute><RegisterPage /></RegularRoute>} />
      <Route path="/terms-of-service" element={<RegularRoute><Termofuse /></RegularRoute>} />
      <Route path="/privacy-policy" element={<RegularRoute><Privacypolicy /></RegularRoute>} />
      <Route path="/support" element={<RegularRoute><SupportPage /></RegularRoute>} />
      <Route path="/developers" element={<RegularRoute><DevelopersPage /></RegularRoute>} />
      
      {/* User Routes - Can be accessed by both admin and users */}
      <Route path="/auction-room/:auctionId" element={<RegularRoute><AuctionRoom /></RegularRoute>} />

      {/* Admin Routes with Admin Layout */}
      <Route path="/dashboard" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
      <Route path="/users" element={<ProtectedAdminRoute><UserAdmin /></ProtectedAdminRoute>} />
      <Route path="/orders" element={<ProtectedAdminRoute><OrdersPage /></ProtectedAdminRoute>} />
      <Route path="/auctions" element={<ProtectedAdminRoute><AuctionsPage /></ProtectedAdminRoute>} />
      <Route path="/scrap" element={<ProtectedAdminRoute><AdminScrapItems /></ProtectedAdminRoute>} />
      <Route path="/contact" element={<ProtectedAdminRoute><ContactPage /></ProtectedAdminRoute>} />
      <Route path="/auction-room-admin/:auctionId" element={<ProtectedAdminRoute><AdminAuctionRoom /></ProtectedAdminRoute>} />
      
      {/* Redirects */}
      <Route path="/admin" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

const App = () => {
  return (
    <UserProvider>
      <Router>
        <AppRoutes />
      </Router>
    </UserProvider>
  );
};

export default App;
