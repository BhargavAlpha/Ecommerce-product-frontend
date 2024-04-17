import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import Admin from './pages/admin-review/Admin';
import Dashboard from './pages/dashboard/Dashboard';
import Profile from './pages/profile/Profile';
import Submissions from './pages/submissions/Submissions';
import ProductDetail from './pages/productdetail/ProductDetail';
import Reviews from './pages/reviews/Reviews';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-submissions" element={<Submissions />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/admin/product/:id" element={<Admin />} />
      </Routes>
      <ToastContainer /> 
    </Router>
  );
}

export default App;
