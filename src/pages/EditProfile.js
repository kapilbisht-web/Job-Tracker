// client/src/pages/EditProfile.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { axiosInstance } from '../api';
import '../styles/profile.css';

const EditProfile = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user?.token) return navigate('/login');

      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      try {
        const res = await axiosInstance.get('/api/auth/profile', config);
        setFormData({ name: res.data.name, email: res.data.email });
      } catch (err) {
        toast.error('Failed to load profile');
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };

    try {
      await axiosInstance.put('/api/auth/profile', formData, config);
      toast.success('Profile updated');
      navigate('/dashboard');
    } catch (err) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="profile-container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <button type="submit" className="edit-profile-btn">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;