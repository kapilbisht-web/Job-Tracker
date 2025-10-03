// App.js or Router.js

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';
import AddJob from './pages/AddJob.js';
import './styles/auth.css';
import EditProfile from './pages/EditProfile.js';
import Profile from './pages/Profile.js';
import ResumeMatch from './pages/Resumematch.js';

const AppRouter = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Routes>
        <Route index element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={user ? <Dashboard /> : <Navigate to="/login" replace />} />
        <Route path="logout" element={<Logout />} />
        <Route path="profile" element={user ? <Profile /> : <Navigate to="/login" replace />} />
        <Route path="add-job" element={user ? <AddJob /> : <Navigate to="/login" replace />} />
        <Route path="edit-profile" element={user ? <EditProfile /> : <Navigate to="/login" replace />} />
        <Route path="resume-match" element={user ? <ResumeMatch /> : <Navigate to="/login" replace />} />
        <Route path="*" element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} />
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