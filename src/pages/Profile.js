import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user?.token) return navigate('/login');

      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      try {
        const res = await axios.get('http://localhost:5000/api/auth/profile', config);
        setProfile(res.data);
      } catch (err) {
        toast.error('Failed to load profile');
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => navigate('/logout');
  const handleEditProfile = () => navigate('/edit-profile');

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Total Jobs:</strong> {profile.totalJobs}</p>

      <button onClick={handleEditProfile} className="edit-profile-btn">
        Edit Profile
      </button>

      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
      <button onClick={() => navigate('/dashboard')} className="back-btn">
  Back to Dashboard
</button>
    </div>
  );
};

export default Profile;