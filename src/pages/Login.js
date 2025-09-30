// client/src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { axiosInstance } from '../api';
import '../styles/auth.css';

const Login = () => {
  const [form, setForm] = useState({ name: '', email: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/api/auth/login', form);
      console.log('Login form:', form);
      localStorage.setItem('user', JSON.stringify(res.data));
      toast.success(`Welcome back, ${res.data.name}!`);
      setTimeout(() => navigate('/dashboard'), 100);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
      console.error(err);
    }
  };

  return (
    <div className="auth-page login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <button type="submit">Log In</button>
        <p style={{ textAlign: 'center' }}>
          New here? <a href="/register">Sign up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;