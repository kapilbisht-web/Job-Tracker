import { useState } from 'react';
import axios from 'axios';
import '../styles/auth.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // 👁️ Import icons

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false); // 👁️ Toggle state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    if (!/[A-Z]/.test(form.password) || !/[0-9]/.test(form.password)) {
      toast.error('Password must contain at least one uppercase letter and one number');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      toast.success('Registration successful! Please log in.');
      navigate('/login');
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed';
      toast.error(message);
    }
  };

  return (
    <div className="auth-page register-page">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />

        <div className="password-wrapper">
          <input
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <span onClick={() => setShowPassword(!showPassword)} className="eye-icon">
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button type="submit">Sign Up</button>
        <p style={{ textAlign: 'center' }}>
          Already have an account? <a href="/login">Log in</a>
        </p>
      </form>
    </div>
  );
};

export default Register;