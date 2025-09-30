// App.js or Router.js

import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';
import './styles/auth.css';
import EditProfile from './pages/EditProfile.js';
import Profile from './pages/Profile.js';

const AppRouter = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={user ? <Navigate to="dashboard" /> : <Navigate to="login" />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={user ? <Dashboard /> : <Navigate to="login" />} />
        <Route path="logout" element={<Logout />} />
        <Route path="profile" element={<Profile />} />
        <Route path="edit-profile" element={<EditProfile />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

// ✅ Add this at the bottom
export default function WrappedRouter() {
  const basename =
    process.env.NODE_ENV === 'production' ? '/Job-Tracker' : '/';

  return (
    <BrowserRouter basename={basename}>
      <AppRouter />
    </BrowserRouter>
  );
}