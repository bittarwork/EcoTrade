// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
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
import Termofuse from "./pages/Termofuse";
import Privacypolicy from './pages/Privacypolicy';
import UserAdmin from './pages/admin/UserAdmin';
import './index.css';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Users" element={<UserAdmin />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/auctions" element={<AuctionsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/developers" element={<DevelopersPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/terms-of-service" element={<Termofuse />} />
            <Route path="/privacy-policy" element={<Privacypolicy />} />
            <Route path="/auction-room/:auctionId" element={<AuctionRoom />} />
            <Route path="/auction-room-admin/:auctionId" element={<AdminAuctionRoom />} />
          </Routes>
        </Layout>
      </Router>
    </UserProvider>
  );
};

export default App;
